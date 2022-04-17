#importar BERT e modelos Intencoes
from sklearn.neural_network import MLPClassifier

from transformers import AutoTokenizer  
from transformers import AutoModel  
import torch



import numpy as np
import string
from tqdm import tqdm


from transformers import BertForTokenClassification, AdamW
from transformers import get_linear_schedule_with_warmup

import torch
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler
from transformers import BertTokenizer, BertConfig

class Controlador():

    def __init__(self):
        pass
    
    def treina(self, entrada):
        if isinstance(entrada, list):
            for piece in tqdm(entrada):
                self.treina_modelo(piece)
        else:
            self.treina_modelo(entrada)

    # privada
    def treina_modelo(self, piece):
        # treinar o modelo no 'piece' por 1 epoca com lr baixo
        pass


class ControladorIntent(Controlador):
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased', do_lower_case=False)
        self.bert_model = AutoModel.from_pretrained('neuralmind/bert-base-portuguese-cased') 
        self.classificador = MLPClassifier(random_state=1, max_iter=100)
        self.intencoes = ['[cumprimento]',
                            '[req_placa]',
                            '[req_cpf]',
                            '[info_valor]',
                            '[req_mais]',
                            '[agradecimento]',
                            '[despedida]',
                            '[req_ajuda]',
                            '[consulta_saldo]',
                            '[info_placa]',
                            '[info_cpf]',
                            '[negacao]']
    
    def classifica(self, sentence):
        vetor_cls = self.gera_vetor_cls(sentence)
        classificacao = {}
        predicoes = self.classificador.predict(vetor_cls.reshape(1,-1))[0]
        for intencao, predicao in zip(self.intencoes, predicoes):
          classificacao[intencao] = predicao
        return classificacao

    def treina_modelo(self, piece):
        vetor_cls = self.gera_vetor_cls(piece['sentence'])
        classes = [a for a in range(len(piece['anotacao_intencao'].values()))]
        input_inst = vetor_cls.reshape(1,-1)
        target_inst = np.array([list(piece['anotacao_intencao'].values())])
        self.classificador.partial_fit(input_inst, target_inst, classes)
        

    def gera_vetor_cls(self, utterance):
        input_ids = self.tokenizer.encode(utterance, return_tensors='pt')
        with torch.no_grad():
            outs = self.bert_model(input_ids)
            vetor_embbeding = outs.last_hidden_state[0][0]
            vetor_embbeding = vetor_embbeding.tolist()
        return np.array(vetor_embbeding)


 
class ControladorEntity(Controlador):
    def __init__(self):
        self.tag_values = ['PAD',
                            'B-cpf',
                            'B-cpf:',
                            'B-cpf}',
                            'B-nome',
                            'B-placa',
                            'B-placa}',
                            'B-valor',
                            'O']
        self.token_to_id = {'B-cpf': 1,
                            'B-cpf:': 2,
                            'B-cpf}': 3,
                            'B-nome': 4,
                            'B-placa': 5,
                            'B-placa}': 6,
                            'B-valor': 7,
                            'O': 8,
                            'PAD': 0}
        self.tokenizer = BertTokenizer.from_pretrained("neuralmind/bert-base-portuguese-cased", do_lower_case=False)
        self.model = BertForTokenClassification.from_pretrained(
            "neuralmind/bert-base-portuguese-cased",
            num_labels=len(self.token_to_id),
            output_attentions = False,
            output_hidden_states = False)
        
        self.___MAX_LEN = 55
        self.___device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.losses=[]



    def classifica(self, sentence):
        # chamar o modelo e passar a sentenca
        # retornar o resultado do modelo
        tokenized_sentence = self.tokenizer.encode(sentence)
        input_ids = torch.tensor([tokenized_sentence])
        with torch.no_grad():
            output = self.model(input_ids)
        label_indices = np.argmax(output[0].to('cpu').numpy(), axis=2)

        # join bpe split tokens
        tokens = self.tokenizer.convert_ids_to_tokens(input_ids.to('cpu').numpy()[0])
        new_tokens, new_labels = [], []
        for token, label_idx in zip(tokens, label_indices[0]):
            if token.startswith("##"):
                new_tokens[-1] = new_tokens[-1] + token[2:]
            elif token in string.punctuation:
                new_tokens[-1] = new_tokens[-1] + token
            else:
                new_labels.append(self.tag_values[label_idx])
                new_tokens.append(token)
        return (new_tokens, new_labels)
    
    def tokenize_and_preserve_labels(self, sentence, text_labels):
        tokenized_sentence = []
        labels = []

        for word, label in zip(sentence, text_labels):

            # Tokenize the word and count # of subwords the word is broken into
            tokenized_word = self.tokenizer.tokenize(word)
            n_subwords = len(tokenized_word)

            # Add the tokenized word to the final tokenized word list
            tokenized_sentence.extend(tokenized_word)

            # Add the same label to the new list of labels `n_subwords` times
            labels.extend([label] * n_subwords)

        return tokenized_sentence, labels
    
    def treina_modelo(self, piece):

      token_utt, labels = piece
      #realiza tokenização do bert
      token_utt, labels = self.tokenize_and_preserve_labels(token_utt, labels)

      #transforma tokens em ids, completa tamanho
      input = self.tokenizer.convert_tokens_to_ids(token_utt)
      input = input + [0]*(self.___MAX_LEN-len(input))
      
      
      #define mascara
      mask = [float(i != 0.0) for i in input]

      #define tags (labels em forma de numeros)

      tags = [self.token_to_id.get(l) for l in labels]
      tags = tags + [0]*(self.___MAX_LEN-len(tags))
      
      #converto tensor
      input = torch.tensor(input)
      mask = torch.tensor(mask)
      tags = torch.tensor(tags)


      

      train_data = TensorDataset(input, mask, tags)

      train_dataloader = DataLoader(train_data, batch_size=32)

      optimizer = AdamW(
          self.model.parameters(),
          lr=3e-5,
          eps=1e-8
      )

      epochs = 1
      max_grad_norm = 1.0

      # Total number of training steps is number of batches * number of epochs.
      total_steps = len(train_dataloader) * epochs

      # Create the learning rate scheduler.
      scheduler = get_linear_schedule_with_warmup(
          optimizer,
          num_warmup_steps=0,
          num_training_steps=total_steps
      )

      #colocar em modo de treino e definir loss total
      self.model.train()
      total_loss=0

      for step, batch in enumerate(train_dataloader):
          # add batch to gpu          
          batch = tuple(t.to(self.___device) for t in batch)
          b_input_ids, b_input_mask, b_labels = batch
          b_input_ids = b_input_ids.expand(1,len(b_input_ids))
          b_input_mask = b_input_mask.expand(1,len(b_input_mask))
          b_labels = b_labels.expand(1,len(b_labels))
          # Always clear any previously calculated gradients before performing a backward pass.
          self.model.zero_grad()
          # forward pass
          # This will return the loss (rather than the model output)
          # because we have provided the `labels`.
          outputs = self.model(b_input_ids, token_type_ids=None,
                          attention_mask=b_input_mask, labels=b_labels)
          # get the loss
          loss = outputs[0]
          # Perform a backward pass to calculate the gradients.
          loss.backward()
          # track train loss
          total_loss += loss.item()
          # Clip the norm of the gradient
          # This is to help prevent the "exploding gradients" problem.
          torch.nn.utils.clip_grad_norm_(parameters=self.model.parameters(), max_norm=max_grad_norm)
          # update parameters
          optimizer.step()
          # Update the learning rate.
          scheduler.step()
      self.losses.append(total_loss)
        
