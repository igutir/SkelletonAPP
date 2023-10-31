import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})

export class HomePage{

    data: any;

    loggedUser = {
        nombre: "",
        apellido: "",
        nivel_educacion: "",
        fecha_nacimiento: ""
    }

    nivel_educacional: string[] = ['Básica', 'Media', 'Superior'];

    constructor(private activeRouter: ActivatedRoute, private router: Router, public alertController: AlertController) {
        this.activeRouter.queryParams.subscribe(params =>{
            if(this.router.getCurrentNavigation()?.extras?.state){
                this.data = this.router.getCurrentNavigation()?.extras?.state?.['user'];

            }
            else{
                this.router.navigate(["/login"])
            }
        })
    }

    setNivelEd(nivel: string){
        this.loggedUser.nivel_educacion = nivel;
    }

    async mostrarDatos(){

        const mensaje =`
        Datos ingresados:
        Nombre: ${this.loggedUser.nombre}
        Apellido: ${this.loggedUser.apellido}
        Nivel educacional: ${this.loggedUser.nivel_educacion}
        Fecha Nacimiento: ${this.loggedUser.fecha_nacimiento}
        `;

        const alert = await this.alertController.create({
            header: 'Datos',
            message: mensaje,
            buttons: ['OK']
        });

        await alert.present();
    }

}
