---
title: A Quick Peek into PyTorch
description: Recently I took a course in computer vision. I used to work on big data for a while, and TensorFlow was used during that time, and I have no experience at all with PyTorch. Therefore, I built a dog breed classifier with PyTorch.
category: Tech
---

## Google Colab vs Kaggle

There are several Jupyter Lab services out there and they all pack with different perks. I chose Google Colab to start with since it has a newer version of Python so I could give PyTorch 2.0 a shot (though there might not be too much of a difference for a beginner).

### Replace Pre-installed PyTorch with Your Flavor

Simply just provide the version of your choice and install them with pip, life is that easy:

```bash
pip install torch==2.0.0 torchvision==0.15.1
```

## Prepare Data

Luckily, there is no need for me to hustle on collecting a dataset of different breeds of dogs; the [Stanford Dogs Dataset](http://vision.stanford.edu/aditya86/ImageNetDogs/main.html) saved my time and also I spot the big name behind this dataset -- [Fei-Fei Li](https://en.m.wikipedia.org/wiki/Fei-Fei_Li) which makes it more promising. This dataset consists of 120 breeds of dogs with 20580 images in total.

Then, it is only a simple download and unarchive:

```bash
curl -fsSL -o images.tar http://vision.stanford.edu/aditya86/ImageNetDogs/images.tar
tar xf images.tar

# This is not necessary needed in most cases
# curl -fsSL -o annotations.tar http://vision.stanford.edu/aditya86/ImageNetDogs/annotation.tar
# tar xf annotations.tar
```

## Before Coding

Since I am learning a new framework, I have to write every single line of code by referring to the documentation; I would better think about how would I train this model.

We have 20k+ images over 120 classes, so that is less than 200 images per class. I think that is not a lot of data for a multiclass classification problem. Thus, I decided to do a transfer learning using a simple model: ResNet50 with pre-trained weights on ImageNet.

According to my humble experience, I chose the following stuff/hyperparameters for this model:

- Optimizer: Adam (is it still SOTA?)
- Loss: Cross Entropy Loss
- Batch size: 256 (since the input is $224\times 224$, the free GPU from Google Colab can handle that for sure)

## The Actual Code

Isn't learning a new framework delightful? To feel how much a framework enables you to do in some fields is interesting. Long story short, I divided my code into the following parts:

- Constants initialization
- Loading data
- Batch training iteration declaration
- Model, optimizer and loss initialization
- Training

I will be implementing these step by step.

### Constants

As mentioned above as hyperparameters, I have to define the `BATCH_SIZE` and `EPOCHS` for this model. Additionally, PyTorch uses a [device](https://pytorch.org/docs/stable/tensor_attributes.html#torch.device) to control where computation on tensors takes place, so I chose my default device for training here:

```python
import torch

BATCH_SIZE = 256
EPOCHS = 100
DEVICE = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

print(f'Running on {DEVICE}')
```

### Loading Data

There are usually two steps in PyTorch to read from a dataset:

1. Create a [`Dataset`](https://pytorch.org/docs/stable/data.html#dataset-types) object; this object knows how to iterate the dataset
2. Create a [`DataLoader`](https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader) object; this object knows how to batch the dataset

There is a [nice article](https://pytorch.org/tutorials/beginner/data_loading_tutorial.html) about how exactly one should do to import any shape of data, but the dataset that I am using is well-structured (images are organized in different folders which represent their class), so I can take advantage of the `torchvision` library, and use `ImageFolder` to import all the data:

```python
import matplotlib.pyplot as plt
from torchvision.datasets import ImageFolder
from torchvision.transforms import Compose, Resize, RandomCrop, ToTensor

dogs_dataset = ImageFolder('./Images', transform=Compose([
                                          ToTensor(),
                                          Resize(256, antialias=True),
                                          RandomCrop(224)
                                        ]))

idx_to_class = {v: k.split('-')[1] for k, v in dogs_dataset.class_to_idx.items()}

for i in range(3):
  idx = torch.randint(len(dogs_dataset), (1,))
  data = dogs_dataset[idx]

  ax = plt.subplot(1, 3, i + 1)

  plt.imshow(data[0].numpy().transpose(1, 2, 0))
  ax.set_title(f'{idx_to_class[data[1]]}')

plt.tight_layout()
plt.show()
```

Since ResNet50 takes tensors of size $(3, 224, 224)$, I used [`transforms`](https://pytorch.org/vision/stable/transforms.html) provided by [`torchvision`](https://pytorch.org/vision/stable/index.html) library to accomplish this easily.

Then, using `DataLoader`, the dataset will be automatically batched for you:

```python
from torch.utils.data import random_split, DataLoader

train_size = int(0.8 * len(dogs_dataset))
test_size = len(dogs_dataset) - train_size
train_dataset, test_dataset = random_split(dogs_dataset,
                                           [train_size, test_size])

trainloader = DataLoader(train_dataset,
                         batch_size=BATCH_SIZE,
                         shuffle=True,
                         num_workers=cpu_count())

testloader = DataLoader(train_dataset,
                        batch_size=BATCH_SIZE,
                        shuffle=True,
                        num_workers=cpu_count())

dataloaders_dict = {
  'train': trainloader,
  'val': testloader
}
```

### Batch Training

After some preparation of data, it is time to define the training loop:

```python
from torch import nn, optim

def train_model(model: nn.Module,
                dataloaders: dict[str, DataLoader],
                criterion: nn.Module,
                optimizer: optim.Optimizer,
                num_epochs: int,
                device: torch.device):
  since = time.time()
  val_acc_history = []

  for epoch in range(num_epochs):
    print(f'Epoch {epoch}/{num_epochs - 1}')
    print('-' * 10)

    # Each epoch has a training and validation phase
    for phase in ['train', 'val']:
      
      if phase == 'train':
        model.train()  # Set model to training mode
      else:
        model.eval()   # Set model to evaluate mode

      running_loss = 0.0
      running_corrects = 0

      # Iterate over data
      for inputs, labels in dataloaders[phase]:
        inputs = inputs.to(device)
        labels = labels.to(device)

        # zero the parameter gradients
        optimizer.zero_grad()

        # forward
        # track history if only in train
        with torch.set_grad_enabled(phase == 'train'):
          outputs = model(inputs)
          loss = criterion(outputs, labels)
          _, preds = torch.max(outputs, 1)

          # backward + optimize only if in training phase
          if phase == 'train':
            loss.backward()
            optimizer.step()

        # statistics
        running_loss += loss.item() * inputs.size(0)
        running_corrects += torch.sum(preds == labels.data)

      epoch_loss = running_loss / len(dataloaders[phase].dataset)
      epoch_acc = running_corrects.double() / len(dataloaders[phase].dataset)

      print(f'{phase} Loss: {epoch_loss} Acc: {epoch_acc}')

      if phase == 'val':
        val_acc_history.append(epoch_acc)

    print()

  time_elapsed = time.time() - since
  print(f'Training complete in {time_elapsed // 60}m {time_elapsed % 60}s')
  return model, val_acc_history
```

The code above comes with some more-than-necessary features that can be taken off. The essential part is only the loop and operations done on `optimizer` and `loss`.

### Model, Optimizer, Loss and Training

After defining some essential blocks for the entire workflow, I instantiated the network with pre-trained weights on [ImageNet](https://www.image-net.org/):

```python
from torchvision.models import resnet

model = resnet.resnet50(weights=resnet.ResNet50_Weights.DEFAULT)

for param in model.parameters():
  param.requires_grad = False

model.fc = nn.Linear(2048, 120)
```

As the above code suggested, with not enough data, I only took off the last layer of the network for fine-tuning.

Initialize a loss criterion and an optimizer:

```python
params_to_update = []
for name, param in model.named_parameters():
  if param.requires_grad:
    params_to_update.append(param)

optimizer = optim.Adam(params_to_update)
criterion = nn.CrossEntropyLoss()
```

Note that here I only passed in parameters except the last layer.

After initializing everything, the loss criterion and optimizer will handle the rest:

```python
model, hist = train_model(model,
                          dataloaders_dict,
                          criterion,
                          optimizer,
                          num_epochs=EPOCHS)
```

Get some coffee and wait, things will be done sooner or later.
