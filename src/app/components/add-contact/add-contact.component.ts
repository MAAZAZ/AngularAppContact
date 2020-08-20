import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/module/Contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contacts:any;
  contact:Contact={name:"", tel:""};
  length:number;
  status:boolean=false;
  key:string="";

  constructor(private cs:ContactService) { }

  ngOnInit(): void {
    this.cs.contacts.subscribe(data=>{
      this.contacts=data;
      this.length = this.contacts.length;
    });
  }

  save(){
    this.cs.add(this.contact);
    this.status=!this.status;
    this.contact = { name: "", tel: "" };
  }

  change(){
    this.status=!this.status;
  }

  edit(c){
    this.cs.update(c);
    this.contact = { name: "", tel: "" };
    this.key="";
  }

  choix(key){
    if(this.key!="" && this.key==key)
      this.key= "";
    else
      this.key = key;
  }

  delete(obj){
    if(confirm('Are you sur to delete this contact?'))
      this.cs.destroy(obj);
    else
      this.key = "";
  }

}
