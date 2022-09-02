import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PersonalService } from 'src/app/core/services/personal.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ExportExcellService } from 'src/app/core/services/export-excell.service';
import { ModalEventoComponent } from './modal-evento/modal-evento.component';

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.scss']
})
export class RegistroEventoComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  loadingItem: boolean = false;
  userId!: number;
  filtroForm!: FormGroup;
  totalCuenta: number = 0;
  totalHardware: number = 5;

  page = 1;
  totalPersonal: number = 0;
  pageSize = 10;

  constructor(
    private personalService: PersonalService,
    private exportExcellService: ExportExcellService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newFilfroForm();
    this.cargarOBuscarPersonal();
    this.getListProyectos();
  }

    newFilfroForm(){
    this.filtroForm = this.fb.group({
      nombres           : [''],
      apellidos         : [''],
      dni               : [''],
      codProy           : [''],
      estado            : [''],
      fechaIngresoInicio: [''],
      fechaIngresoFin   : [''],
    })
  };

  listaPersonal: any[] = [];
  cargarOBuscarPersonal(){
    this.blockUI.start("Cargando personal...");
    let parametro: any[] = [{
      "queryId": 121,
      "mapValue": {
          nombre         : this.filtroForm.value.nombres + " " + this.filtroForm.value.apellidos,
          dni            : this.filtroForm.value.dni,
          codigo_proyecto: this.filtroForm.value.codProy,
          id_estado      : this.filtroForm.value.estado,
          inicio         : this.datepipe.transform(this.filtroForm.value.fechaIngresoInicio,"yyyy/MM/dd"),
          fin            : this.datepipe.transform(this.filtroForm.value.fechaIngresoFin,"yyyy/MM/dd"),
      }
    }];
    this.personalService.cargarOBuscarPersonal(parametro[0]).subscribe((resp: any) => {
    this.blockUI.stop();

     console.log('Lista-Personal', resp, resp.list.length);
      this.listaPersonal = [];
      this.listaPersonal = resp.list;

      this.spinner.hide();
    });
  }

  codCorporativo: any;
  tooltipActivoInactivo: string =''
  abrirEliminar(id: number, codCorporrativo: string, estado: string, fullname: string){
    this.codCorporativo = codCorporrativo;

    if (estado == 'Activo')   {this.tooltipActivoInactivo = "Desactivar"}
    if (estado == 'Inactivo') {this.tooltipActivoInactivo = "Activar"}

    Swal.fire({
      title: `${this.tooltipActivoInactivo} al Personal?`,
      text: `¿Desea ${this.tooltipActivoInactivo} al personal: ${fullname} ?`,
      icon: 'question',
      confirmButtonColor: '#20c997',
      cancelButtonColor : '#b2b5b4',
      confirmButtonText : 'Si!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
        if (resp.value) {
          this.bajaOaltaAlPersonal(id, fullname);
       }
      }
    );
  }

  activado_desactivado: string='';
  bajaOaltaAlPersonal(id: number, fullname: string){
    this.spinner.show();
    let parametro:any[] = [{
      "queryId": 9,
      "mapValue": { param_id_persona : id }
    }];

    this.personalService.bajaOaltaAlPersonal(parametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      let msj  = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage
      if(msj == undefined){msj = ''}
      if (msj != '') {

        if (this.tooltipActivoInactivo == 'Desactivar') {this.activado_desactivado = 'Desactivado'}
        if (this.tooltipActivoInactivo == 'Activar'   ) {this.activado_desactivado = 'Activado'}

        Swal.fire({
          title: `${this.tooltipActivoInactivo} al Personal`,
          text: `El Personal: ${fullname}, fue ${this.activado_desactivado} con éxito`,
          icon: 'success',
        });

      }else if (msj2 != ''){
        Swal.fire({
          title: `${this.tooltipActivoInactivo} al Personal`,
          text: `El Personal: ${fullname} No pudo ser: ${this.activado_desactivado}, por que tiene recursos asignados`,
          icon: 'error',
        });

      }else{
        // this.showError('Error');
      }
      this.cargarOBuscarPersonal();
    });
    this.spinner.hide();
  }


  abrirEliminarLogico(id:number, codCorporrativo:string, estado: string, namePersonal: string){
    // this.idEliminar = id;
    this.codCorporativo = codCorporrativo;

    Swal.fire({
      title: `Eliminar Personal?`,
      text: `¿Desea eliminar al personal: ${namePersonal}?`,
      icon: 'question',
      confirmButtonColor: '#20c997',
      cancelButtonColor : '#b2b5b4',
      confirmButtonText : 'Si!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
        if (resp.value) {
          this.eliminacionLogica(id, namePersonal);
       }
      });
  }

  eliminacionLogica(id: number, fullname: string){
    this.spinner.show();
    let parametro:any[] = [{
      "queryId": 37,
      "mapValue": { param_id_persona : id }
    }];

    this.personalService.eliminarPersonal(parametro[0]).subscribe(resp => {
      const arrayData:any[] = Array.of(resp);
      let msj  = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage

      if(msj == undefined){msj = ''}

      if (msj != '') {
        Swal.fire({
          title: 'Eliminar Personal',
          text: `El Personal: ${fullname}, fue eliminado con éxito`,
          icon: 'success',
        });

      }else if (msj2 != ''){
        Swal.fire({
          title: `Eliminar al Personal`,
          text: `El Personal: ${fullname}, no pudo ser eliminado por que tiene recursos asignados`,
          icon: 'error',
        });
      }else{
        // this.showError('Error');
      }
      this.cargarOBuscarPersonal();
    });
    this.spinner.hide();
  }

  listCodProy: any[] = [];
  getListProyectos() {
    let arrayParametro: any[] = [{ queryId: 1 }];

    this.personalService
      .getListProyectos(arrayParametro[0]).subscribe((resp: any) => {
        this.listCodProy = resp.list;
        // console.log('COD_PROY', resp);
      });
  }

  limpiarFiltro() {
    this.filtroForm.reset('', { emitEvent: false });
    this.newFilfroForm();

    this.cargarOBuscarPersonal();
  }

  totalfiltro = 0;
  cambiarPagina(event: number) {
    let offset = event * 10;
    this.spinner.show();

    if (this.totalfiltro != this.totalPersonal) {
      this.personalService
        .cargarOBuscarPersonal(offset.toString())
        .subscribe((resp: any) => {
          this.listaPersonal = resp.list;
          this.spinner.hide();
        });
    } else {
      this.spinner.hide();
    }
    this.page = event;
  }

  crearPersonal() {
    const dialogRef = this.dialog.open(ModalEventoComponent, { width: '70%', height: '90%'});

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.cargarOBuscarPersonal();
      }
    });
  }

  actualizarPersonal(DATA: any) {
    console.log('DATA_PERSONA_HC', DATA);

    this.dialog
      .open(ModalEventoComponent, {width: '70%', height: '95%', data: DATA})
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.cargarOBuscarPersonal();
        }
      });
  }

  exportarRegistro() {
    this.exportExcellService.exportarExcel(this.listaPersonal, 'Persoal');
  }
}
