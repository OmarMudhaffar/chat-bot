import { Component,ViewChild,ElementRef  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Content, List  } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})



export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;

  botimg = "assets/imgs/girl.svg"
  mytext = "";
  lasttext;
  userimg = "assets/imgs/man.svg"
  private mutationObserver: MutationObserver;
  bot = [
    {text:"هلا اني اسمي رسل",class:"bot",img:this.botimg},
 ]

  constructor(public navCtrl: NavController,private http: HTTP) {

  }



  ngOnInit(){
    

  }

  scroll(){
    this.content.scrollToBottom()
  }

  ionViewDidLoad(){

    this.mutationObserver = new MutationObserver((mutations) => {
        this.content.scrollToBottom();
    });

    this.mutationObserver.observe(this.chatList.nativeElement, {
        childList: true
    });

}

  sendMessage(){
if(this.mytext.length > 0){
  
  this.lasttext = this.mytext;
  this.mytext = "";

    var tx = {
      text:this.lasttext,
      class:"user",
      img:this.userimg
    }
    this.bot.push(tx)
    this.http.post("http://sim.s2vn.top/post_sim.php",{hoi:this.lasttext},{}).then( done => {

      var str  = done.data.replace(/(<([^>]+)>)/ig,"").replace("\n","").replace("\n","").replace("\n","").replace("Talk with random person: https://play.google.com/store/apps/details?id=www.speak.com","مافتهمت شكلت");  
      var txbot = {
        text:str,class:"bot",img:this.botimg
      }
      this.bot.push(txbot)
    }).catch( () => {
      alert("حاول مجددا")
    })



    
}
  }

}
