
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Formations{
  constructor(
    public id:number,
    public nom:string,
    public duree:string,
    public domaine:string,
  ) { }
}
@Component({
  selector: 'app-formations',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formation!: Formations[];
  closeResult!:string;
  deletenumInscription!:number;
  editForm!: Object;
   constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal,
   ) { }

   onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/formation/add';
    
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
    openDetails(targetModal: any, formations:Formations): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', formations.nom);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', formations.duree);
       document.getElementById('domaine')?.setAttribute('value', formations.domaine);
      
      
      }
      
      openEdit(targetModal: any, formations: Formations) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', formations.id.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', formations.nom);
        document.getElementById('nouvelleprenom')?.setAttribute('value', formations.duree);
        document.getElementById('nouvelle')?.setAttribute('value', formations.domaine);
       
       
        this.editForm={
     
          matricule: formations.id,
        
        nom: formations.nom,
        
        duree: formations.duree,
        domaine: formations.domaine,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            id :(<HTMLInputElement>document.getElementById("numid")).value,
            nom:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            duree:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
            domaine:(<HTMLInputElement>document.getElementById("nouvelle")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/formation/updateformation/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, formations: Formations) {

          this.deletenumInscription = formations.id;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/formation/deleteformation/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }
  ngOnInit(): void {
    this.getformations();
    this.deletenumInscription;
this.editForm = {
  id: '',
nom: '',
duree: '',
domaine: '',
};
  }

  getformations(){
    this.httpClient.get<any>('http://localhost:9592/formation/getallformations').subscribe(
      response=>{
        console.log(response);this.formation=response;
      }
    )
  }

  resetDB(){
    this.ngOnInit();
  }
  search(){
    this.httpClient.get<any>('http://localhost:9592/formation/findbyid/'+(<HTMLInputElement>document.getElementById("searching")).value).subscribe(
      response=>{
        console.log(response);this.formation=[response];
      }
    )
  }
}
