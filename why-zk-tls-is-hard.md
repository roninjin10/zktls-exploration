Zk tls is hard because the tls keys are symmetric. This means the client can easily forge a response pretending to be the server.

There are three main zk tls designs

1. Just run it in a tee
2. Stick a notary proxy in the middle 
3. Run multi party execution

Just run it in a tee is stupidly simple. You just securely share credentials with a tee and then the tee makes the request on your behalf. But it depends on a tee, something we should avoid depending on if we have other options

Stick a notary proxy in the middle is also relatively simple. You just stick 1 or more proxies in between the server and client and attests to encrypted responses.

The mpc model involves two or more parties needing each others secrets to properly decrypt responses. This is called a multi party computation. Since they cannot decrypt without each others secrets it acts as a very secure way of multiple parties off chain attesting to the data integrity. 

Theoretically you could use tees in both mpc and proxy if you wanted to add more layers of security

Generally the proxy method is simpler and has decent ux from not needing to do a lot of back and forth requests via mpc. It suffers from many in the middle attacks however that a sophisticated client could pull off so is less secure.

All models operate a bit like an offchain multisig at the end of the day with some benifits:

- offchain not onchain secured with signatures 
- private (via zk magic I’m still exploring)
- requires sophisticated actors to exploit when done right 

Zk tls is specifically good when the data is private or non deterministic. Public data such as the score of a sports game might as well just be an onchain attestation removing all the complexity for the same trust assumptions
