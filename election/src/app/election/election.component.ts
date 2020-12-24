
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Elections{
  constructor(
    public matricule:number,
    public nom_Ens:string,
    public prenom_Ens:string,
  ) { }
}
@Component({
  selector: 'app-elections',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  election!: Elections[];
  closeResult!:string;
  deletenumInscription!:number;
  editForm!: Object;
   constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal,
   ) { }

   onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/election/add';
    
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
    openDetails(targetModal: any, elections:Elections): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', elections.nom_Ens);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', elections.prenom_Ens);
      
      
      }
      
      openEdit(targetModal: any, elections: Elections) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', elections.matricule.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', elections.nom_Ens);
        document.getElementById('nouvelleprenom')?.setAttribute('value', elections.prenom_Ens);
       
       
        this.editForm={
     
          matricule: elections.matricule,
        
        nom_Ens: elections.nom_Ens,
        
        prenom_Ens: elections.prenom_Ens,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            matricule :(<HTMLInputElement>document.getElementById("numid")).value,
            nom_Ens:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            prenom_Ens:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/election/updateelection/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, elections: Elections) {

          this.deletenumInscription = elections.matricule;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/election/deleteelection/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }
  ngOnInit(): void {
    this.getelections();
    this.deletenumInscription;
this.editForm = {
  matricule: '',
nom_Ens: '',
prenom_Ens: '',
};
  }

  getelections(){
    this.httpClient.get<any>('http://localhost:9592/election/getallelections').subscribe(
      response=>{
        console.log(response);this.election=response;
      }
    )
  }

  resetDB(){
    this.ngOnInit();
  }
  search(){
    this.httpClient.get<any>('http://localhost:9592/election/findbyid/'+(<HTMLInputElement>document.getElementById("searching")).value).subscribe(
      response=>{
        console.log(response);this.election=[response];
      }
    )
  }
}
