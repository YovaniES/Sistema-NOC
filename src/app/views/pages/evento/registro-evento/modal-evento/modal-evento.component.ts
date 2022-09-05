import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventoService } from 'src/app/core/services/evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-evento',
  templateUrl: './modal-evento.component.html',
  styleUrls: ['./modal-evento.component.scss']
})
export class ModalEventoComponent implements OnInit {

  loadingItem: boolean = false;
  userID: number = 0;
  eventoForm!: FormGroup;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<ModalEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public DATA_EVENTO: any
  ) { }

  ngOnInit(): void {
    this.newForm();
    // this.valueChanges();
    this.getListEstado();
    this.getListNotificaciones();
    this.getlistTipoIncidencia();
    this.getListPrioridades();
    this.getlistMotivosEvento();
    this.getlistDescripcion();
    // this.getListTiposEvento();
    this.getUsuario();
    this.cargarEventoByID();
    this.getListAreaResponsable();
    this.ListaHistoricoCambios(this.DATA_EVENTO);

    console.log('DATA_EVENTO', this.DATA_EVENTO);
    console.log('DATA_EVEN_ESTADO_TICKET', this.DATA_EVENTO.tipo_evento);
  }

  newForm(){
    this.eventoForm = this.fb.group({
     cod_evento       : [''],
     tipo             : ['', [Validators.required]],
     prioridad        : ['', [Validators.required]],
     descripcion      : ['', [Validators.required]],
     estado           : ['', [Validators.required]],
     motivo           : ['', [Validators.required]],
     plataforma       : ['', [Validators.required]],
     servicios        : ['', [Validators.required]],
     h_deteccion      : ['', [Validators.required]],
     h_inicio         : ['', [Validators.required]],
     fecha_inicio     : ['', [Validators.required]],
     modo_notificacion: ['', [Validators.required]],
     h_notificacion   : ['', [Validators.required]],
     destinado_a      : ['', [Validators.required]],
     fecha_fin        : ['', ],
     h_fin            : ['', ],
     ticket_generado  : ['', [Validators.required]],
     h_generacion     : ['', [Validators.required]],
     estado_ticket    : ['', [Validators.required]],
     area_responsable : ['', [Validators.required]],
     fecha_resolucion : [''],
     h_solucion       : ['', [Validators.required]],
     pbi              : [''],
     eta_pbi          : [''],
     motivo_notas     : [''],
     comentarios      : [''],

    })
   }

  crearOactualizarEvento() {
    this.spinner.show();

    if (!this.DATA_EVENTO) {
      if (this.eventoForm.valid) {
        this.crearEvento()
      }
    } else {
      // this.actualizarEvento();
      // this.cargarEventoByID();
    }
    this.spinner.hide();
  }

  crearEvento(){
    const formValues = this.eventoForm.getRawValue();
    let parametro: any =  {
        queryId: 111111111111116,
        mapValue: {
          param_id_tipo       : formValues.tipo,
          param_id_marca      : formValues.marca,
          param_descripcion   : formValues.equipo,
          param_modelo        : formValues.modelo,
          param_serie         : formValues.serie,
          param_imei          : formValues.imei,
          param_observacion   : formValues.observacion,
          CONFIG_USER_ID      : this.userID,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      };

     console.log('VAOR', this.eventoForm.value , parametro);
    this.eventoService.crearEvento(parametro).subscribe((resp: any) => {
      Swal.fire({
        title: 'Crear Evento!',
        text: `Evento: ${formValues.modelo}, creado con éxito`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.close(true);
    });
  }

   actualizarEvento(){
    this.spinner.show();

    const formValues = this.eventoForm.getRawValue();
    let parametro: any[] = [{
        queryId: 111111111111111117,
        mapValue: {
          param_id_recurso    : this.DATA_EVENTO.id_recurso,
          param_id_tipo       : this.eventoForm.value.tipo,
          param_id_marca      : this.eventoForm.value.marca,
          param_descripcion   : this.eventoForm.value.equipo,
          param_modelo        : this.eventoForm.value.modelo,
          param_serie         : this.eventoForm.value.serie,
          param_imei          : this.eventoForm.value.imei,
          param_observacion   : this.eventoForm.value.observacion,
          CONFIG_USER_ID      : this.userID,
          CONFIG_OUT_MSG_ERROR: "",
          CONFIG_OUT_MSG_EXITO: "",
        },
      }];

    this.eventoService.actualizarEvento(parametro[0]).subscribe( {next: (resp: any) => {
      this.spinner.hide();

      // console.log('DATA_ACTUALIZADO', resp);
      this.cargarEventoByID();
      this.dialogRef.close('Actualizar')

      Swal.fire({
        title: 'Actualizar evento!',
        text : `Evento:  ${formValues.modelo }, actualizado con éxito`,
        icon : 'success',
        confirmButtonText: 'Ok'
        })
    }, error: () => {
      Swal.fire(
        'ERROR',
        'No se pudo actualizar el Evento',
        'warning'
      );
    }});
  };


  actionBtn: string = 'Registrar';
  cargarEventoByID(){
    if (this.DATA_EVENTO) {
    this.actionBtn = 'Actualizar'
      this.eventoForm.controls['cod_evento'       ].setValue(this.DATA_EVENTO.cod_evento);
      this.eventoForm.controls['tipo'             ].setValue(this.DATA_EVENTO.id_tipo_evento);
      this.eventoForm.controls['prioridad'        ].setValue(this.DATA_EVENTO.id_prioridad);
      this.eventoForm.controls['descripcion'      ].setValue(this.DATA_EVENTO.descripcion);
      this.eventoForm.controls['estado'           ].setValue(this.DATA_EVENTO.id_estado);
      this.eventoForm.controls['motivo'           ].setValue(this.DATA_EVENTO.id_motivo);
      this.eventoForm.controls['plataforma'       ].setValue(this.DATA_EVENTO.aplicacion );
      this.eventoForm.controls['servicios'        ].setValue(this.DATA_EVENTO.cantidad );
      this.eventoForm.controls['h_deteccion'      ].setValue(this.DATA_EVENTO.hora_deteccion);
      this.eventoForm.controls['fecha_inicio'     ].setValue(this.DATA_EVENTO.f_inicio);
      this.eventoForm.controls['h_inicio'         ].setValue(this.DATA_EVENTO.hora_inicio);
      this.eventoForm.controls['modo_notificacion'].setValue(this.DATA_EVENTO.id_modonotificacion);
      this.eventoForm.controls['h_notificacion'   ].setValue(this.DATA_EVENTO.hora_notificacion);
      this.eventoForm.controls['destinado_a'      ].setValue(this.DATA_EVENTO.destinatario );
      this.eventoForm.controls['fecha_fin'        ].setValue(this.DATA_EVENTO.f_fin );
      this.eventoForm.controls['h_fin'            ].setValue(this.DATA_EVENTO.hora_fin);
      this.eventoForm.controls['ticket_generado'  ].setValue(this.DATA_EVENTO.codigo_ticket_generado);
      this.eventoForm.controls['h_generacion'     ].setValue(this.DATA_EVENTO.hora_generacion);
      this.eventoForm.controls['estado_ticket'    ].setValue(this.DATA_EVENTO.estado_ticket);
      this.eventoForm.controls['area_responsable' ].setValue(this.DATA_EVENTO.id_area_responsable);
      this.eventoForm.controls['fecha_resolucion' ].setValue(this.DATA_EVENTO.fecha_resolucion);
      this.eventoForm.controls['h_solucion'       ].setValue(this.DATA_EVENTO.hora_resolucion);
      this.eventoForm.controls['pbi'              ].setValue(this.DATA_EVENTO.pbi );
      this.eventoForm.controls['eta_pbi'          ].setValue(this.DATA_EVENTO.eta_pbi);
      this.eventoForm.controls['motivo_notas'     ].setValue(this.DATA_EVENTO.notas );
      this.eventoForm.controls['comentarios'      ].setValue(this.DATA_EVENTO.comentariosgenerales);

    }
  }

  campoNoValido(campo: string): boolean {
    if ( this.eventoForm.get(campo)?.invalid && this.eventoForm.get(campo)?.touched ) {
      return true;
    } else {
      return false;
    }
  }

  // valueChanges(){
  //   this.eventoForm.get('modelo')?.valueChanges.subscribe((valor: string) => {
  //     this.eventoForm.patchValue( {modelo: valor.toUpperCase()}, {emitEvent: false});
  //   });

  //   this.eventoForm.get('serie')?.valueChanges.subscribe((valor: string) => {
  //     this.eventoForm.patchValue( {serie: valor.toUpperCase()}, {emitEvent: false});
  //   })
  // }

  listHistoricoCambios: any[] = [];
  ListaHistoricoCambios(idRegistro:number){
    this.spinner.show();

    let parametro:any[] = [{
      "queryId": 39,
      "MapValue": {
        "p_id": this.DATA_EVENTO.idreg
      }
    }];
    this.eventoService.ListaHistoricoCambios(parametro[0]).subscribe((resp: any) => {
      this.listHistoricoCambios = resp.list;
     console.log("listHistorico", resp.list);
      this.spinner.hide();
    });
  }

  getUsuario(){
    this.authService.getCurrentUser().subscribe( resp => {
      this.userID   = resp.user.userId;
      console.log('ID-USER', this.userID);
    })
   }

   listTipoIncidencia: any[] = [];
   getlistTipoIncidencia(){
     let parametro: any[] = [{queryId: 38}];

     this.eventoService.getlistTipoIncidencia(parametro[0]).subscribe((resp: any) => {
       this.listTipoIncidencia = resp.list;
       console.log('TIPO_INCIDENCIA', resp.list);

     });
   }

   listDescripcion: any[] = [];
   getlistDescripcion(){
     let parametro: any[] = [{queryId: 42}];

     this.eventoService.getlistDescripcion(parametro[0]).subscribe((resp: any) => {
       this.listDescripcion = resp.list;
       console.log('TIPO_INCIDENCIA', resp.list);

     });
   }

   listMotivos: any[] = [];
   getlistMotivosEvento(){
     let parametro: any[] = [{queryId: 40}];

     this.eventoService.getlistMotivosEvento(parametro[0]).subscribe((resp: any) => {
       this.listMotivos = resp.list;
       console.log('TIPO_INCIDENCIA', resp.list);

     });
   }

   listPrioridades: any[] = [];
   getListPrioridades(){
     let parametro: any[] = [{ queryId: 37 }];

     this.eventoService.getListPrioridades(parametro[0]).subscribe((resp: any) => {
       this.listPrioridades = resp.list;
       console.log('PRIORIDADES', resp.list);

     });
   }

   listEstado: any[] = [];
   getListEstado(){
     let parametro: any[] = [{ queryId: 35 }];

     this.eventoService.getListEstado(parametro[0]).subscribe((resp: any) => {
       this.listEstado = resp.list;
      //  console.log('ESTADOS', resp.list);

     });
   }

   listNotificaciones: any[]=[]
   getListNotificaciones(){
    let parametro: any[] = [{ queryId: 36 }];

    this.eventoService.getListNotificaciones(parametro[0]).subscribe((resp: any) => {
      this.listNotificaciones = resp.list;
      console.log('NOTIFICACIONES', resp.list);

    });
  }

  listAreaResponsable: any[] = [];
  getListAreaResponsable() {
    let parametro: any[] = [{ queryId: 34 }];

    this.eventoService.getListAreaResponsable(parametro[0]).subscribe((resp: any) => {
        this.listAreaResponsable = resp.list;
        console.log('AREA_RESP', resp);
      });
  }

  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }

}
