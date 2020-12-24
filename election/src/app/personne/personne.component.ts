
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Personnes{
  constructor(
    public id:number,
    public nom:string,
    public prenom:string,
    public login:string,
    public password:string
  ) { }
}
@Component({
  selector: 'app-personnes',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {
  personne!: Personnes[];
  closeResult!:string;
  deletenumInscription!:number;
  editForm!: Object;
   constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal,
   ) { }

   onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/personne/add';
    
    this.httpClient.post(url, f.value)
    
    .subscribe((result) => {
    
    this.ngOnInit(); // reload the table
    
    });
    
    this.modalService.dismissAll(); // dismiss the modal
    
    }
  open(content: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
    
    this.closeResult = 'Closed with:${result}';
    
    },
    
    (reason: any) => {
    
    this.closeResult = 'Dismissed: ${this.getDismissReason(reason)}';
    
    });
    
    }
    
    private getDismissReason(reason: any): string {
    
    if (reason === ModalDismissReasons.ESC) {
    
    return 'by pressing ESC';
    
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    
    return 'by clicking on a backdrop';
    
    } else {
    
    return 'with:${reason}';
    
    }
    
    }
    openDetails(targetModal: any, personnes:Personnes): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', personnes.nom);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', personnes.prenom);
      
      
      }
      
      openEdit(targetModal: any, personnes: Personnes) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', personnes.id.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', personnes.nom);
        document.getElementById('nouvelleprenom')?.setAttribute('value', personnes.prenom);
        document.getElementById('nouvelle')?.setAttribute('value', personnes.login);
        document.getElementById('nouvellepassword')?.setAttribute('value', personnes.password);
       
       
        this.editForm={
     
          id: personnes.id,
        
        nom: personnes.nom,
        
        prenom: personnes.prenom,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            id :(<HTMLInputElement>document.getElementById("numid")).value,
            nom:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            prenom:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
            login:(<HTMLInputElement>document.getElementById("nouvelle")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/personne/updatepersonne/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, personnes: Personnes) {

          this.deletenumInscription = personnes.id;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/personne/deletepersonne/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }
  ngOnInit(): void {
    this.getpersonnes();
    this.deletenumInscription;
this.editForm = {
  id: '',
nom: '',
prenom: '',
login:''
};
  }

  getpersonnes(){
    this.httpClient.get<any>('http://localhost:9592/personne/getallpersonnes').subscribe(
      response=>{
        console.log(response);this.personne=response;
      }
    )
  }

  resetDB(){
    this.ngOnInit();
  }
  search(){
    this.httpClient.get<any>('http://localhost:9592/personne/findbyid/'+(<HTMLInputElement>document.getElementById("searching")).value).subscribe(
      response=>{
        console.log(response);this.personne=[response];
      }
    )
  }
}
