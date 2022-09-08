import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EventoService } from 'src/app/core/services/evento.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ExportExcellService } from 'src/app/core/services/export-excell.service';
import { ModalEventoComponent } from './modal-evento/modal-evento.component';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';

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

  page = 1;
  totalPersonal: number = 0;
  pageSize = 10;

  constructor(
    private EventoService: EventoService,
    private exportExcellService: ExportExcellService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newFilfroForm();
    this.cargarOBuscarEvento();
    this.getListAreaResponsable();
  }

    newFilfroForm(){
    this.filtroForm = this.fb.group({
      cod_ticket           : [''],
      usuario              : [''],
      area_responsable     : [''],
      fecha_registro_inicio: [''],
      fecha_registro_fin   : [''],
    })
  };

  listaEventos: any[] = [];
  cargarOBuscarEvento(){
    this.blockUI.start("Cargando eventos...");
    let parametro: any[] = [{
      "queryId": 41,
      "mapValue": {
          p_cod_ticket         : this.filtroForm.value.cod_ticket,
          p_usuario            : this.filtroForm.value.usuario,
          p_id_area_responsable: this.filtroForm.value.area_responsable,
          inicio               : this.datepipe.transform(this.filtroForm.value.fecha_registro_inicio,"yyyy/MM/dd"),
          fin                  : this.datepipe.transform(this.filtroForm.value.fecha_registro_fin,"yyyy/MM/dd"),
      }
    }];
    this.EventoService.cargarOBuscarEvento(parametro[0]).subscribe((resp: any) => {
    this.blockUI.stop();

     console.log('Lista-eventos', resp, resp.list.length);
      this.listaEventos = [];
      this.listaEventos = resp.list;

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
          // this.bajaOaltaAlEvento(id, fullname);
       }
      }
    );
  }

  abrirEliminarLogico(id:number, codCorporrativo:string, estado: string, nameevento: string){
    // this.idEliminar = id;
    this.codCorporativo = codCorporrativo;

    Swal.fire({
      title: `Eliminar evento?`,
      text: `¿Desea eliminar el evento: ${nameevento}?`,
      icon: 'question',
      confirmButtonColor: '#20c997',
      cancelButtonColor : '#b2b5b4',
      confirmButtonText : 'Si!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
        if (resp.value) {
          this.eliminacionLogica(id, nameevento);
       }
      });
  }

  eliminacionLogica(id: number, fullname: string){
    this.spinner.show();
    let parametro:any[] = [{
      "queryId": 37,
      "mapValue": { param_id_persona : id }
    }];

    this.EventoService.eliminarEvento(parametro[0]).subscribe((resp: any) => {
      const arrayData:any[] = Array.of(resp);
      let msj  = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage

      if(msj == undefined){msj = ''}

      if (msj != '') {
        Swal.fire({
          title: 'Eliminar evento',
          text: `El evento: ${fullname}, fue eliminado con éxito`,
          icon: 'success',
        });

      }else if (msj2 != ''){
        Swal.fire({
          title: `Eliminar el evento`,
          text: `El evento: ${fullname}, no pudo ser eliminado por que tiene recursos asignados`,
          icon: 'error',
        });
      }else{
        // this.showError('Error');
      }
      this.cargarOBuscarEvento();
    });
    this.spinner.hide();
  }

  listAreaResponsable: any[] = [];
  getListAreaResponsable() {
    let parametro: any[] = [{ queryId: 34 }];

    this.EventoService.getListAreaResponsable(parametro[0]).subscribe((resp: any) => {
        this.listAreaResponsable = resp.list;
        // console.log('AREA_RESP', resp);
      });
  }

  limpiarFiltro() {
    this.filtroForm.reset('', { emitEvent: false });
    this.newFilfroForm();

    this.cargarOBuscarEvento();
  }

  totalfiltro = 0;
  cambiarPagina(event: number) {
    let offset = event * 10;
    this.spinner.show();

    if (this.totalfiltro != this.totalPersonal) {
      this.EventoService.cargarOBuscarEvento(offset.toString()).subscribe((resp: any) => {
          this.listaEventos = resp.list;
          this.spinner.hide();
        });
    } else {
      this.spinner.hide();
    }
    this.page = event;
  }

  crearEvento() {
    const dialogRef = this.dialog.open(ModalEventoComponent, { width: '70%', height: '90%'});
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.cargarOBuscarEvento();
      }
    });
  }

  actualizarPersonal(DATA: any) {
    console.log('DATA_EVENTO', DATA);

    const dialogRef = this.dialog.open(ModalEventoComponent, { width: '70%', height: '95%', data: DATA});
    dialogRef.afterClosed().subscribe((resp) => {
        if (resp) {
          this.cargarOBuscarEvento();
        }
      });
  }

  abrirDetalleEvento(dataDetalle: string) {
    console.log('DATA_DETALLE', dataDetalle);

    const dialogRef = this.dialog.open(ModalDetalleComponent, { width: '60%',data: dataDetalle});
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.cargarOBuscarEvento();
      }
    });
  }

  exportarRegistro() {
    this.exportExcellService.exportarExcel(this.listaEventos, 'Evento');
  }
}
