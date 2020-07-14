# Pruvo Coding Assignment

## Install

    $ git clone https://github.com/NerminImamovic/pruvo
    $ cd pruvo
    $ yarn install

    If you don't have configured aws locally:  

    Install aws-cli locally: 

    $ sudo apt install awscli

    Then configure: 

    $ aws configure          
    $ AWS Access Key ID [None]: dummy
    $ AWS Secret Access Key [None]: dummy
    $ Default region name [None]: dummy
    $ Default output format [None]: json

To start Amazon SQS locally

    $ docker-compose up -d 

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
    
## Sending Message from the client side

```javascript
// Set same configuration for aws and squiess as in src/App.ts

    const messageToSend = {
      name: 'messageName',
      message: {
        email: "email@email.com",
        from: "USD",
        to: "EUR",
      },
    };

    squiss.sendMessage(messageToSend);

```
 
