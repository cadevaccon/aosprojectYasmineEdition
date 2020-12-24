
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


export class Partis{
  constructor(
    public id:number,
    public nom:string,
    public prenom:string,
    public local:string,
  ) { }
}
@Component({
  selector: 'app-partis',
  templateUrl: './parti.component.html',
  styleUrls: ['./parti.component.css']
})
export class PartiComponent implements OnInit {
  parti!: Partis[];
  closeResult!:string;
  deletenumInscription!:number;
  editForm!: Object;
   constructor(
    private httpClient:HttpClient,
    private modalService:NgbModal,
   ) { }

   onSubmit(f:NgForm) {

    const url = 'http://localhost:9592/parti/add';
    
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
    openDetails(targetModal: any, partis:Partis): void {

      this.modalService.open(targetModal, {
      
      centered: true,
      
      backdrop: 'static',
      
      size: 'lg'
      
      });
      
      document.getElementById('nom_Etu')?.setAttribute('value', partis.nom);
      
       document.getElementById('prenom_Etu')?.setAttribute('value', partis.prenom);
      
      
      }
      
      openEdit(targetModal: any, partis: Partis) {

        this.modalService.open(targetModal, {
        
        backdrop: 'static',
        
        size: 'lg'
        
        });
        document.getElementById('numid')?.setAttribute('value', partis.id.toString());
        document.getElementById('nouvellenom')?.setAttribute('value', partis.nom);
        document.getElementById('nouvelleprenom')?.setAttribute('value', partis.prenom);
        document.getElementById('nouvelle')?.setAttribute('value', partis.local);

       
       
        this.editForm={
     
          id: partis.id,
        
        nom: partis.nom,
        
        prenom: partis.prenom,
        
    
        };
        
        }
        
        onSave() {
          this.editForm={
            matricule :(<HTMLInputElement>document.getElementById("numid")).value,
            nom_Ens:(<HTMLInputElement>document.getElementById("nouvellenom")).value,
            prenom_Ens:(<HTMLInputElement>document.getElementById("nouvelleprenom")).value,
          }

          console.log(this.editForm);
        const editURL = 'http://localhost:9592/parti/updateparti/' + (<HTMLInputElement>document.getElementById("numid")).value ;
         
        this.httpClient.put(editURL, this.editForm).subscribe((results) => {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        
        });
        this.ngOnInit(); 
        this.modalService.dismissAll(); // dismiss the modal
    
        }
        openDelete(targetModal: any, partis: Partis) {

          this.deletenumInscription = partis.id;
          this.modalService.open(targetModal, {
          
          backdrop: 'static',
          
          size: 'lg'
          
          });
          this.ngOnInit();
          }
  
          onDelete() {
              console.log(this.deletenumInscription);
            const deleteURL = 'http://localhost:9592/parti/deleteparti/'+this.deletenumInscription;
            
            this.httpClient.delete(deleteURL)
            
            .subscribe((résultats) => {
            
            
            });
            
            
            this.modalService.dismissAll();
            this.ngOnInit();
            
            }
  ngOnInit(): void {
    this.getpartis();
    this.deletenumInscription;
this.editForm = {
  id: '',
nom: '',
prenom: '',
local:''
};
  }

  getpartis(){
    this.httpClient.get<any>('http://localhost:9592/parti/getallpartis').subscribe(
      response=>{
        console.log(response);this.parti=response;
      }
    )
  }

  resetDB(){
    this.ngOnInit();
  }
  search(){
    this.httpClient.get<any>('http://localhost:9592/parti/findbyid/'+(<HTMLInputElement>document.getElementById("searching")).value).subscribe(
      response=>{
        console.log(response);this.parti=[response];
      }
    )
  }
}
