import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Brightness } from '@ionic-native/brightness';
import { BatteryStatus } from '@ionic-native/battery-status';
import { FirebaseProvider} from '../../providers/firebase-provider';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public brightness;
  public bateria;
  public imagem=[];
  public img;
  public msg;
  constructor(public navCtrl: NavController, public brit: Brightness,
    public bat: BatteryStatus,
    public firebase: FirebaseProvider,
    public contacts: Contacts,
    public alertCrtl: AlertController,
    public sms: SMS) {
    this.getBrightnessC();
    this.watchBattery();
    this.getImagem();

  }

  /**
   * [changeValue description]
   * @return {[type]} [description]
   */
  changeValue(){
    let value = this.brightness / 100;
    this.brit.setBrightness(value);
  }

  /**
   * [getBrightnessC description]
   * @return {[type]} [description]
   */
  getBrightnessC() {
    this.brit.getBrightness().then(data => {
      this.brightness = Math.round(data * 100);
    });
  }

  /**
   * [watchBattery description]
   * @return {[type]} [description]
   */
  watchBattery(){
    let subscription = this.bat.onChange().subscribe( (response) => {
      this.bateria = response.level;
      if(response.level<=30){
        this.brit.setBrightness(0.4);
      }
    })
  }

  /**
   * [getImagem description]
   * @return {[type]} [description]
   */
  getImagem(){
    //Caminho ou referencia de onde queremos  recuperar os dados
    let path = this.firebase.auth().currentUser.uid + '/imagem/';
    this.firebase.database().ref(path).on('value', (snapshot) =>{
      //Então atribuimos o valor do snapshot  à lista de disciplinas
      this.imagem.push(snapshot.val());
      this.img = this.imagem[0].img;
    });
  }

  /**
   * [openContacts description]
   * @return {[type]} [description]
   */
  openContacts(){
    this.contacts.pickContact().then((response)=>{
      if((response.phoneNumbers.length > 0)){
        console.log(response.phoneNumbers[0].value);
        this.openAlert(response.phoneNumbers[0].value);
      }

    });
  }

  /**
   * [logout description]
   * @return {[type]} [description]
   */
  logout(){
    this.firebase.auth().signOut().then(()=>this.navCtrl.setRoot(HomePage));
  }

  /**
   * [openAlert description]
   * @return {[type]} [description]
   */
  openAlert(number){
    let alert = this.alertCrtl.create();
    alert.setTitle('Informe a mensagem:');
    alert.addInput({
      type:'text',
      placeholder: 'mensagem',
      name: 'msg'
    });
    alert.addButton({
      text: 'Enviar',
      handler:(resposta)=>{
        this.sms.send(number, resposta.msg);
      }
    })
    alert.present();



  }
}
