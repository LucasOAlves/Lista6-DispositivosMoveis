import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public user = {email:'', password:''};

  public options: CameraOptions = {
    quality: 95,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  public imagem;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebase: FirebaseProvider,
    public camera: Camera) {



  }

  capturar(){
    this.camera.getPicture(this.options).then(
      (imageData) => this.imagem = 'data:image/jpeg;base64,'+imageData,
      (err) => console.log(err));
  }

  register(){
    //Checa se os dados não estão vazios
    if(this.user.email != '' && this.user.password!='' && this.imagem != null){
      //Tenta criar o cadastro
      this.firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(()=>{
      //Caminho ou referencia de onde queremos gravar os dados
      let postId = this.firebase.database().ref().child('/imagem').push().key;
      let path = this.firebase.auth().currentUser.uid + '/imagem/';
      //O objeto que queros gravar
      let objct = {
        img: this.imagem,
      };
      this.firebase.database().ref(path).set(objct);
        // let storageRef = firebase.storage().ref();
        // // Create a timestamp as filename
        // const filename = Math.floor(Date.now() / 1000);
        // const imageRef = storageRef.child(`images/${filename}.jpg`);
        // imageRef.putString(this.imagem, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        //   console.log('foi');
        // });
      }).catch((error)=>{console.log(error.message)});
    }
  }

  upload() {

  }
  login(){
    //Checa se os dados não estão vazios
    if(this.user.email != '' && this.user.password !=''){
      // Tenta logar com os dados do usuário
      this.firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
      //Retorna um errro se nao consegur criar o usuario
      .catch((error)=>{console.log(error.message)});
    }
  }

}
