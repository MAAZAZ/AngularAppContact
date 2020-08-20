import { Contact } from 'src/app/module/Contact';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactCollection:AngularFirestoreCollection<Contact>;
  _contacts: Observable<Contact[]>;
  document: AngularFirestoreDocument<Contact>;

  constructor(private afs: AngularFirestore) { 
    this.contactCollection=this.afs.collection('contacts');
    this._contacts = this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );;
  }


get contacts(){
  return this._contacts;
}

add(obj: Contact){
  this.contactCollection.add(obj);
}

update(obj:Contact){
  this.document = this.contactCollection.doc<Contact>(obj.id);
  this.document.update(obj);
}

destroy(obj:Contact){
  this.document = this.contactCollection.doc<Contact>(obj.id);
  this.document.delete();
}

}



