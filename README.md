FireBase=> it is an all in one platform, we get databases, we get authentication, we get file storgae since within this project we upload images with the house listing.
Firebsae is a greate tool when it coesm to creating mobile and desktip applciaiton.
1-create Firebase Project
2-create "web" app within firebase to get config file//api key
3-Install firebase in your project 'npm install firebase'
4-create config file within the project
5-add Authentication for email/password and Google
6-Create a use from firebase
/////////////////
in the way of creating firebsae, avoid ticking firebase hoisting.
Register app.
it iwll giver api key and all stuyiur need.
you need to create a onfig file within your app and then put this code overther
firebase.config.js
grab all the code from firebase and pasete on the firebase.xonfig.js
firestore is a database which you will use
import {getFirestrore} from './firebase/firestore'

export const db = getFirestroe()...
/////////////////////////
how to add authentication?
go to firebase, and within your dashboard fo to authentication// and then hit get srated. there will be a page and show you some bunch of stauug
what you need is Google Oath amd email,password.
hit email/password and then enable that
