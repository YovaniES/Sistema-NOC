import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_PERSONAS } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(private http: HttpClient) {}

  getListTiposHardware(obj: any){
    return this.http.post(API_PERSONAS, obj).pipe(
      map((marca: any) => {
        return marca.list.map((m: any) => {
          return {
            id         : m.id,
            nombre     : m.nombre,
            descripcion: m.descripcion
          }
        })
      })
    )
  }

  getListMarcaHardware(obj: any){
    return this.http.post(API_PERSONAS, obj).pipe(
      map((marca: any) => {
        return marca.list.map((m: any) => {
          return {
            id         : m.id,
            nombre     : m.nombre,
            descripcion: m.descripcion
          }
        })
      })
    )
  };

  getListEstados(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  };

  getListGestores(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  };

  getListLiquidaciones(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  };

  crearOactualizarHardware(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  crearOactualizarCuenta(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  };

  crearEntidadLista(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  actualizarTablaEntidad(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  agregarEntidadTabla(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }
  crearPersonal(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  crearLiquidacion(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  // Listado de TIPOS
  getListTiposCuentas(obj: any){
    return this.http.post(API_PERSONAS, obj).pipe(
      map((tipo: any) => {
        return tipo.list.map((t: any) => {
          return {
            id          : t.id,
            nombre      : t.nombre,
            descripcion : t.descripcion
          }
        })
      })
    );
  };

  getListProyectos(obj: any){
    return this.http.post(API_PERSONAS, obj);
  };

  getListPerfiles(obj: any){
    return this.http.post(API_PERSONAS, obj).pipe(
      map((perfil: any) => {
        return perfil.list.map((p: any) => {
          return {
            id          : p.id,
            nombre      : p.nombre,
            descripcion : p.descripcion
          }
        })
      })
    );
  };

  getDescPerfil(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  getDescProy(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  getListEntidades(obj: any){
    return this.http.post(API_PERSONAS, obj)
  };

  getListTotalTablas(obj: any) {
    return this.http.post(API_PERSONAS, obj).pipe(
      map((tablas: any) => {
        return tablas.list.map((t: any) => {
          return {
            id         : t.id,
            nombre     : t.nombre,
            descripcion: t.descripcion,
            idPadre    : t.idPadre,
          };
        });
      })
    );
  }

  ListaHardwareAsignado(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  ListaCuentaAsignado(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  asignarRecurso(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  desasignarRecurso(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  cargarOBuscarcuentas(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  cargarOBuscarHardware(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  cargarOBuscarPersonal(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  cargarOBuscarHardwareDisponible(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  cargarOBuscarCuentaDisponible(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  cargarOBuscarEntidades(id: any) {
    return this.http.post(API_PERSONAS, id);
  };

  cargarOBuscarLiquidacion(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  agregarVentaDeclarada(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  agregarCertificacion(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  cargarVentaDeclarada(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  cargarVentaDeclaradaById(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  cargarFactura(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  getListEstadosFacturacion(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  getHistoricoCambiosProyecto(obj: any) {
    return this.http.post(API_PERSONAS, obj).pipe(
      map((histCamb: any) => {
        return histCamb.list.map( (historico: any) => {
          return {
            id_persona                : historico.id_persona,
            id_proyecto               : historico.id_proyecto,
            proyecto_codigo           : historico.proyecto_codigo,
            proyecto_descripcion      : historico.proyecto_descripcion,
            fecha_asignacion          : historico.fecha_asignacion,
            id_usuario_asignacion     : historico.id_usuario_asignacion,
            nombre_usuario_asignacion : historico.nombre_usuario_asignacion,
          }
        })
      })
    );
  }

  getHistoricoHarwareByPersonal(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  getHistoricoCambiosEstado(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  agregarFacturaCambios(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  actualizarCuenta(obj: any) {
    return this.http.post(API_PERSONAS, obj);
  }

  actualizarHardware(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  actualizarPersonal(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  actualizarLiquidacion(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  actualizacionMasiva(obj: any){
    return this.http.post(API_PERSONAS, obj);
  }

  eliminarCuenta(id: number) {
    return this.http.post(API_PERSONAS, id);
  }

  eliminarHardware(id: number) {
    return this.http.post(API_PERSONAS, id);
  }

  eliminarEntidad(id: number){
    return this.http.post(API_PERSONAS, id);
  }

  eliminarPersonal(id: number) {
    return this.http.post(API_PERSONAS, id);
  }

  darBajaOaltaPersonal(id: number) {
    return this.http.post(API_PERSONAS, id);
  }

  bajaOaltaAlPersonal(id: number){
    return this.http.post(API_PERSONAS, id);
  }

  eliminarLiquidacion(id: number) {
    return this.http.post(API_PERSONAS, id);
  }

  cargarCuentasById(obj: any) {
    return this.http.post(API_PERSONAS, obj)
  };

  cargarPersonalById(obj: any) {
    return this.http.post(API_PERSONAS, obj)
  };

  cargarHardwareById(obj: any) {
    return this.http.post(API_PERSONAS, obj)
  }

  cargarFacturaById(obj: any) {
    return this.http.post(API_PERSONAS, obj)
  };

  actualizarVentaDeclarada(obj: any){
    return this.http.post(API_PERSONAS, obj)
  };

  actualizarCertificacion(obj: any){
    return this.http.post(API_PERSONAS, obj)
  }

  eliminarVentaDeclarada(obj: any){
    return this.http.post(API_PERSONAS, obj)
  }

  eliminaFactura(obj: any){
    return this.http.post(API_PERSONAS, obj)
  }
}
