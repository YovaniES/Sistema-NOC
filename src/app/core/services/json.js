/* [
  {
      "id": 1,
      "type": 1,
      "description": "Get all projects",
      "sql": "
          SELECT
              id_correlativo as id,
              valor_texto_1 as codigo,
              valor_texto_2 as descripcion
          FROM entidad
          WHERE id_tabla = 1 AND estado = 1
    order by id_correlativo asc;
      "
  },
  {
      "id": 2,
      "type": 1,
      "description": "Get one project",
      "sql": "
          SELECT
              id_correlativo as id,
              valor_texto_1 as codigo,
              valor_texto_2 as descripcion
          FROM entidad
          WHERE id_tabla = 1 AND estado = 1 and id_correlativo = @param_id_proyecto;
      "
  },
  {
      "id": 3,
      "type": 4,
      "description": "Record one project",
      "sql": "
          CALL prc_ins_proyecto(
              @param_codigo,
              @param_descripcion,
      @param_id_padre,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 4,
      "type": 5,
      "description": "Update one project",
      "sql": "
          CALL prc_update_proyecto(
              @param_id_proyecto,
              @param_codigo,
              @param_descripcion,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 5,
      "type": 6,
      "description": "Delete one project",
      "sql": "
          CALL prc_delete_proyecto(
              @param_id_proyecto,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 6,
      "type": 1,
      "description": "Get all persons",
      "sql": "
          SELECT p.id, p.nombres, concat(p.apellido_paterno, ' ', p.apellido_materno) as apellidos,
              p.correo, p.dni, p.codigo_corporativo, perfil.valor_texto_1 as perfil,
              proyecto.valor_texto_1 as codigo_proyecto, proyecto.valor_texto_2 as proyecto_descripcion,
              date_format(p.fecha_ingreso, '%d/%m/%Y') as fecha_ingreso,
              case
                  when p.estado = 1 then 'Activo'
                  else 'Inactivo'
              end as estado
          FROM persona p
              left join entidad proyecto on p.id_proyecto = proyecto.id_correlativo and proyecto.id_tabla = 1
              left join entidad perfil on p.id_perfil = perfil.id_correlativo and perfil.id_tabla = 2
          WHERE
              p.eliminacion_logica = 1
    order by p.id asc;

      "
  },
  {
      "id": 7,
      "type": 4,
      "description": "Insert one person",
      "sql": "
          CALL prc_ins_persona(
              @param_codigo_corporativo,
              @param_nombres,
              @param_apellido_paterno,
              @param_apellido_materno,
              @param_dni,
              @param_correo,
              @param_fecha_ingreso,
              @param_fecha_nacimiento,
              @param_id_proyecto,
              @param_id_perfil,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 8,
      "type": 5,
      "description": "Update one person",
      "sql": "
          CALL prc_update_persona(
              @param_id_persona,
              @param_codigo_corporativo,
              @param_nombres,
              @param_apellido_paterno,
              @param_apellido_materno,
              @param_dni,
              @param_correo,
              @param_fecha_ingreso,
              @param_fecha_nacimiento,
              @param_id_proyecto,
              @param_id_perfil,
              @param_estado,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 9,
      "type": 5,
      "description": "Delete one person",
      "sql": "
          CALL prc_delete_persona(
              @param_id_persona,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 10,
      "type": 1,
      "description": "Get all profiles",
      "sql": "
          SELECT
              id_correlativo as id,
              valor_texto_1 as nombre,
              valor_texto_2 as descripcion
          FROM entidad
          WHERE id_tabla = 2 AND estado = 1
    order by id_correlativo asc;
      "
  },
  {
      "id": 11,
      "type": 1,
      "description": "Get one profile",
      "sql": "
          SELECT
              id_correlativo as id,
              valor_texto_1 as nombre,
              valor_texto_2 as descripcion
          FROM entidad
          WHERE id_tabla = 2 AND estado = 1 and id_correlativo = @param_id_perfil;
      "
  },
  {
      "id": 12,
      "type": 4,
      "description": "Record one profile",
      "sql": "
          CALL prc_ins_perfil(
              @param_nombre,
              @param_descripcion,
      @param_id_padre,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 13,
      "type": 5,
      "description": "Update one profile",
      "sql": "
          CALL prc_update_perfil(
              @param_id_perfil,
              @param_nombre,
              @param_descripcion,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 14,
      "type": 6,
      "description": "Delete one profile",
      "sql": "
          CALL prc_delete_perfil(
              @param_id_perfil,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 15,
      "type": 1,
      "description": "Get all recursos hardware",
      "sql": "
          SELECT
              r.id AS id_recurso,
              tipo.valor_texto_1 AS tipo,
              marca.valor_texto_1 AS marca,
              rh.descripcion AS equipo,
              rh.modelo AS modelo,
              rh.serie AS serie,
              rh.imei AS imei,
              (select concat(p.apellido_paterno,' ',p.apellido_materno,',',p.nombres) nombres
      from recurso_hardware rhd
      inner join
      persona_recursos pr
      on rhd.id = pr.id_recurso
      inner join
      persona p
      on pr.id_persona = p.id
              inner join
              entidad marcaent
              on rhd.id_tipo = marcaent.id_correlativo
      where rhd.id = rh.id and marcaent.id_tabla = 4 and pr.fecha_liberacion is null) nombres,
              CASE
                  WHEN r.estado = 0 THEN 'Reservado'
                  ELSE 'Disponible'
              END AS estado_recurso,
              rh.observaciON
          FROM
              recurso r
                  INNER JOIN
              recurso_hardware rh ON r.id = rh.id
                  INNER JOIN
              entidad AS tipo ON rh.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 3
                  INNER JOIN
              entidad AS marca ON rh.id_marca = marca.id_correlativo
                  AND marca.id_tabla = 4
        AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 16,
      "type": 4,
      "description": "Record one hardware",
      "sql": "
          CALL prc_ins_hardware(
              @param_id_tipo,
              @param_id_marca,
              @param_descripcion,
              @param_modelo,
              @param_serie,
              @param_imei,
              @param_observacion,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 17,
      "type": 5,
      "description": "Update one hardware",
      "sql": "
          CALL prc_update_hardware(
              @param_id_recurso,
              @param_id_tipo,
              @param_id_marca,
              @param_descripcion,
              @param_modelo,
              @param_serie,
              @param_imei,
              @param_observacion,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 18,
      "type": 6,
      "description": "Delete one hardware",
      "sql": "
          CALL prc_delete_hardware(
              @param_id_hardware,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 19,
      "type": 4,
      "description": "Record one cuenta",
      "sql": "
          CALL prc_ins_cuenta(
              @param_usuario,
              @param_password,
              @param_id_tipo,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 20,
      "type": 5,
      "description": "Update one cuenta",
      "sql": "
          CALL prc_update_cuenta(
              @param_id_recurso,
              @param_usuario,
              @param_password,
              @param_id_tipo,
              @param_fecha_ultima_renovacion,
              @param_fecha_proxima_renovacion,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 21,
      "type": 4,
      "description": "Record one hardware tipo",
      "sql": "
          CALL prc_ins_hardware_tipo(
              @param_nombre,
              @param_descripcion,
      @param_id_padre,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 22,
      "type": 4,
      "description": "Record one hardware marca",
      "sql": "
          CALL prc_ins_hardware_marca(
              @param_nombre,
              @param_descripcion,
      @param_id_padre,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 23,
      "type": 1,
      "description": "Get availables hardware",
      "sql": "
          SELECT
              r.id,
              tipo.valor_texto_1 as tipo,
              marca.valor_texto_1 as marca,
              rh.descripcion,
              rh.modelo,
              rh.serie,
              rh.imei,
              rh.observacion
          FROM
              recurso_hardware rh
                  INNER JOIN
              recurso r ON rh.id = r.id
                  INNER JOIN
              entidad tipo ON rh.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 3
                  INNER JOIN
              entidad marca ON rh.id_marca = marca.id_correlativo
                  AND marca.id_tabla = 4
          WHERE
              r.estado = 1 AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 24,
      "type": 1,
      "description": "Get availables cuenta",
      "sql": "
          SELECT
              r.id,
              rc.usuario,
              rc.password,
              tipo.valor_texto_1 AS tipo,
              rc.fecha_ultima_renovacion,
              rc.fecha_proxima_renovacion
          FROM
              recurso_cuenta rc
                  INNER JOIN
              recurso r ON rc.id = r.id
                  INNER JOIN
              entidad tipo ON rc.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 5
          WHERE
              r.estado = 1 AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 25,
      "type": 4,
      "description": "Assign one recurso(hardware o cuenta) to persona",
      "sql": "
          CALL prc_assign_recurso_to_persona(
              @param_id_persona,
              @param_id_recurso,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 26,
      "type": 5,
      "description": "Unassign one recurso from one persona",
      "sql": "
          CALL prc_unassign_recurso_from_persona(
              @param_id_recurso,
              @param_id_persona,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 27,
      "type": 1,
      "description": "Get hardware from one persona",
      "sql": "
          SELECT
              r.id,
              tipo.valor_texto_1 AS tipo,
              marca.valor_texto_1 AS marca,
              rh.descripcion,
              rh.modelo,
              rh.serie,
              rh.imei,
              rh.observacion
          FROM
              recurso r
                  INNER JOIN
              recurso_hardware rh ON r.id = rh.id
                  INNER JOIN
              entidad tipo ON rh.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 3
                  INNER JOIN
              entidad marca ON rh.id_marca = marca.id_correlativo
                  AND marca.id_tabla = 4
                  INNER JOIN
              persona_recursos pr ON r.id = pr.id_recurso
                  INNER JOIN
              persona p ON pr.id_persona = p.id
          WHERE
              p.id = @param_id_persona AND r.estado != 1
                  AND pr.fecha_liberacion IS NULL;
      "
  },
  {
      "id": 28,
      "type": 1,
      "description": "Get cuenta from one persona",
      "sql": "
          SELECT
              rc.id,
              rc.usuario,
              rc.password,
              tipo.valor_texto_1 AS tipo,
              rc.fecha_ultima_renovacion,
              rc.fecha_proxima_renovacion
          FROM
              recurso r
                  INNER JOIN
              recurso_cuenta rc ON r.id = rc.id
                  INNER JOIN
              persona_recursos pr ON r.id = pr.id_recurso
                  INNER JOIN
              persona p ON pr.id_persona = p.id
                  INNER JOIN
              entidad tipo ON rc.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 5
          WHERE
              p.id = @param_id_persona AND r.estado != 1
                  AND pr.fecha_liberacion IS NULL;
      "
  },
  {
      "id": 29,
      "type": 1,
      "description": "search hardware disponible by serie",
      "sql": "
    SELECT
              r.id AS id_recurso,
              tipo.valor_texto_1 AS tipo,
              marca.valor_texto_1 AS marca,
              rh.descripcion AS equipo,
              rh.modelo AS modelo,
              rh.serie AS serie,
              rh.imei AS imei,
              (select concat(p.apellido_paterno,' ',p.apellido_materno,',',p.nombres) nombres
      from recurso_hardware rhd
      inner join
      persona_recursos pr
      on rhd.id = pr.id_recurso
      inner join
      persona p
      on pr.id_persona = p.id
              inner join
              entidad marcaent
              on rhd.id_tipo = marcaent.id_correlativo
      where rhd.id = rh.id and marcaent.id_tabla = 4 and pr.fecha_liberacion is null) nombres,
              CASE
                  WHEN r.estado = 0 THEN 'Reservado'
                  ELSE 'Disponible'
              END AS estado_recurso,
              rh.observacion
          FROM
              recurso r
                  INNER JOIN
              recurso_hardware rh ON r.id = rh.id
                  INNER JOIN
              entidad AS tipo ON rh.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 3
                  INNER JOIN
              entidad AS marca ON rh.id_marca = marca.id_correlativo
                  AND marca.id_tabla = 4
          WHERE
      (@param_serie IS NULL OR rh.serie LIKE CONCAT('%',@param_serie,'%'))
      AND (@param_id_tipo IS NULL OR tipo.id_correlativo = @param_id_tipo)
      AND (@param_id_marca IS NULL OR marca.id_correlativo = @param_id_marca)
      AND r.estado = 1 AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 30,
      "type": 1,
      "description": "search persona",
      "sql": "
          SELECT
              p.id,
              p.nombres,
              CONCAT(p.apellido_paterno,
                      ' ',
                      p.apellido_materno) AS apellidos,
              p.correo,
              p.dni,
              p.codigo_corporativo,
              perfil.valor_texto_1 AS perfil,
              proyecto.valor_texto_1 AS codigo_proyecto,
              proyecto.valor_texto_2 AS proyecto_descripcion,
              DATE_FORMAT(p.fecha_ingreso, '%d/%m/%Y') AS fecha_ingreso,
              CASE
                  WHEN p.estado = 1 THEN 'Activo'
                  ELSE 'Inactivo'
              END AS estado
          FROM
              persona p
              left join entidad perfil on perfil.id_correlativo = p.id_perfil and perfil.id_tabla = 2
              left join entidad proyecto on proyecto.id_correlativo = p.id_proyecto and proyecto.id_tabla = 1
          WHERE
              (@nombre IS NULL
                  OR UPPER(CONCAT(p.nombres,
                              ' ',
                              p.apellido_paterno,
                              ' ',
                              p.apellido_materno)) LIKE CONCAT('%', @nombre, '%'))
                  AND (@dni IS NULL
                  OR p.dni LIKE CONCAT('%', @dni, '%'))
                  AND (@codigo_proyecto IS NULL
                  OR p.id_proyecto = @codigo_proyecto)
                  AND ((@inicio IS NULL AND @fin IS NULL)
                  OR (@inicio IS NOT NULL AND @fin IS NOT NULL)
                  AND DATE(p.fecha_ingreso) BETWEEN STR_TO_DATE(@inicio, '%Y/%m/%d') AND STR_TO_DATE(@fin, '%Y/%m/%d')
                  OR (@inicio IS NOT NULL AND @fin IS NULL)
                  AND DATE(p.fecha_ingreso) >= STR_TO_DATE(@inicio, '%Y/%m/%d')
                  OR (@inicio IS NULL AND @fin IS NOT NULL)
                  AND DATE(p.fecha_ingreso) <= STR_TO_DATE(@fin, '%Y/%m/%d'))
                  AND (DATEDIFF(@fin, @inicio) <= 90
                  OR (@inicio IS NULL AND @fin IS NULL))
                  AND p.eliminacion_logica = 1
          ORDER BY p.fecha_ingreso DESC;
      "
  },
  {
      "id": 31,
      "type": 1,
      "description": "Get one persona",
      "sql": "
          SELECT
              p.id,
              p.nombres,
              p.apellido_paterno,
              p.apellido_materno,
              p.correo,
              p.dni,
              p.codigo_corporativo,
              perfil.valor_texto_1 AS perfil,
              p.id_perfil AS id_perfil,
              proyecto.valor_texto_1 AS codigo_proyecto,
              p.id_proyecto AS id_codigo_proyecto,
              proyecto.valor_texto_2 AS proyecto_descripcion,
              DATE_FORMAT(p.fecha_ingreso, '%d/%m/%Y') AS fecha_ingreso,
              DATE_FORMAT(p.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento,
              CASE
                  WHEN p.estado = 1 THEN 'Activo'
                  ELSE 'Inactivo'
              END AS estado
          FROM
              persona p
                  LEFT JOIN
              entidad proyecto ON p.id_proyecto = proyecto.id_correlativo
                  AND proyecto.id_tabla = 1
                  LEFT JOIN
              entidad perfil ON p.id_perfil = perfil.id_correlativo
                  AND perfil.id_tabla = 2
          WHERE
              p.id = @param_id_persona
              AND p.eliminacion_logica = 1;
      "
  },
  {
      "id": 32,
      "type": 1,
      "description": "Get all hardware tipos",
      "sql": "
          SELECT
              id_correlativo AS id,
              valor_texto_1 AS nombre,
              valor_texto_2 AS descripcion
          FROM
              entidad e
          WHERE
              estado = 1 AND id_tabla = 3;
      "
  },
  {
      "id": 33,
      "type": 1,
      "description": "Get all hardware marcas",
      "sql": "
          SELECT
              id_correlativo AS id,
              valor_texto_1 AS nombre,
              valor_texto_2 AS descripcion
          FROM
              entidad e
          WHERE
              estado = 1 AND id_tabla = 4;
      "
  },
  {
      "id": 34,
      "type": 1,
      "description": "Get one hardware",
      "sql": "
          SELECT
              rh.id,
              tipo.valor_texto_1 AS tipo,
              tipo.id_correlativo as id_tipo,
              marca.valor_texto_1 AS marca,
              marca.id_correlativo as id_marca,
              rh.descripcion,
              rh.modelo,
              rh.serie,
              rh.imei,
              rh.observacion,
              rh.costo_mensual_actual
          FROM
              recurso_hardware rh
                  left JOIN
              entidad tipo ON rh.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 3
                  left JOIN
              entidad marca ON rh.id_marca = marca.id_correlativo
                  AND marca.id_tabla = 4
          WHERE
              rh.id = @param_id_hardware ;
      "
  },
  {
      "id": 35,
      "type": 6,
      "description": "Delete one hardware marca",
      "sql": "
          CALL prc_delete_marca(
              @param_id_marca,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
  "id": 36,
  "type": 6,
  "description": "Delete one hardware tipo",
  "sql": "
  CALL prc_delete_tipo(
  @param_id_tipo,
  @CONFIG_USER_ID,
  @CONFIG_OUT_MSG_ERROR,
  @CONFIG_OUT_MSG_EXITO )
  "
  },
  {
  "id": 37,
  "type": 5,
  "description": "Delete logic one person",
  "sql": "
    CALL prc_delete_logica_persona(
      @param_id_persona,
      @CONFIG_USER_ID,
      @CONFIG_OUT_MSG_ERROR,
      @CONFIG_OUT_MSG_EXITO
    )
  "
  },
  {
      "id": 38,
      "type": 1,
      "description": "Get all cuentas",
      "sql": "
    SELECT
      r.id,
      rc.usuario,
      rc.password,
      tipo.valor_texto_1 AS tipo,
      rc.fecha_ultima_renovacion,
      rc.fecha_proxima_renovacion,
      (select distinct(concat(p.apellido_paterno,' ',p.apellido_materno,',',p.nombres)) nombres
      from recurso_cuenta rcd
      inner join
      persona_recursos pr
      on rcd.id = pr.id_recurso
      inner join
      persona p
      on pr.id_persona = p.id
      inner join
      entidad tipoent
      ON rcd.id_tipo = tipoent.id_correlativo
      where rcd.id = rc.id and tipoent.id_tabla = 5 and pr.fecha_liberacion is null) nombres,
      CASE
        WHEN r.estado = 0 THEN 'Reservado'
        ELSE 'Disponible'
      END estado
    FROM
      recurso_cuenta rc
        INNER JOIN
      recurso r ON rc.id = r.id
        INNER JOIN
      entidad tipo ON rc.id_tipo = tipo.id_correlativo
        AND tipo.id_tabla = 5
    WHERE r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 39,
      "type": 4,
      "description": "Record one cuenta tipo",
      "sql": "
          CALL prc_ins_cuenta_tipo(
              @param_nombre,
              @param_descripcion,
      @param_id_padre,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 40,
      "type": 1,
      "description": "Get all cuenta tipo",
      "sql": "
          SELECT
              id_correlativo as id,
              valor_texto_1 as nombre,
              valor_texto_2 as descripcion
          FROM entidad
          WHERE id_tabla = 5 AND estado = 1;
      "
  },
{
  "id": 41,
  "type": 6,
  "description": "Delete one cuenta tipo",
  "sql": "
    CALL prc_delete_cuenta_tipo(
    @param_id_tipo,
    @CONFIG_USER_ID,
    @CONFIG_OUT_MSG_ERROR,
    @CONFIG_OUT_MSG_EXITO )
  "
},
{
  "id": 42,
  "type": 6,
  "description": "Delete one cuenta",
  "sql": "
    CALL prc_delete_cuenta(
    @param_id_cuenta,
    @CONFIG_USER_ID,
    @CONFIG_OUT_MSG_ERROR,
    @CONFIG_OUT_MSG_EXITO )
  "
},
  {
      "id": 43,
      "type": 1,
      "description": "Get information from one cuenta",
      "sql": "
         SELECT
              rc.id,
              tipo.valor_texto_1 AS tipo,
              tipo.id_correlativo as id_tipo,
              rc.usuario,
              rc.password,
              rc.fecha_ultima_renovacion,
              rc.fecha_proxima_renovacion
          FROM
              recurso_cuenta rc
                  left JOIN
              entidad tipo ON rc.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 5
          WHERE
              rc.id = @param_id_cuenta;
      "
  },
  {
      "id": 44,
      "type": 1,
      "description": "search cuenta disponible by usuario",
      "sql": "
          SELECT
              r.id,
              rc.usuario,
              rc.password,
              tipo.valor_texto_1 AS tipo,
              rc.fecha_ultima_renovacion,
              rc.fecha_proxima_renovacion
          FROM
              recurso_cuenta rc
                  INNER JOIN
              recurso r ON rc.id = r.id
                  INNER JOIN
              entidad tipo ON rc.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 5
          WHERE
      rc.usuario LIKE CONCAT('%', @param_usuario , '%')
              AND r.estado = 1 AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 45,
      "type": 1,
      "description": "search hardware by serie",
      "sql": "
    SELECT
              r.id AS id_recurso,
              tipo.valor_texto_1 AS tipo,
              marca.valor_texto_1 AS marca,
              rh.descripcion AS equipo,
              rh.modelo AS modelo,
              rh.serie AS serie,
              rh.imei AS imei,
              (select concat(p.apellido_paterno,' ',p.apellido_materno,',',p.nombres) nombres
      from recurso_hardware rhd
      inner join
      persona_recursos pr
      on rhd.id = pr.id_recurso
      inner join
      persona p
      on pr.id_persona = p.id
              inner join
              entidad marcaent
              on rhd.id_tipo = marcaent.id_correlativo
      where rhd.id = rh.id and marcaent.id_tabla = 4 and pr.fecha_liberacion is null) nombres,
              CASE
                  WHEN r.estado = 0 THEN 'Reservado'
                  ELSE 'Disponible'
              END AS estado_recurso,
              rh.observacion
          FROM
              recurso r
                  INNER JOIN
              recurso_hardware rh ON r.id = rh.id
                  INNER JOIN
              entidad AS tipo ON rh.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 3
                  INNER JOIN
              entidad AS marca ON rh.id_marca = marca.id_correlativo
                  AND marca.id_tabla = 4
          WHERE
      (@param_serie IS NULL OR rh.serie LIKE CONCAT('%',@param_serie,'%'))
      AND (@param_id_tipo IS NULL OR tipo.id_correlativo = @param_id_tipo)
      AND (@param_id_marca IS NULL OR marca.id_correlativo = @param_id_marca)
      AND (@param_id_estado IS NULL OR r.estado = @param_id_estado)
      AND (@param_imei IS NULL OR rh.imei = @param_imei)
      AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 46,
      "type": 1,
      "description": "search cuenta by usuario",
      "sql": "
          SELECT
              r.id,
              rc.usuario,
              rc.password,
              tipo.valor_texto_1 AS tipo,
              rc.fecha_ultima_renovacion,
              rc.fecha_proxima_renovacion,
      (select distinct(concat(p.apellido_paterno,' ',p.apellido_materno,',',p.nombres)) nombres
      from recurso_cuenta rcd
      inner join
      persona_recursos pr
      on rcd.id = pr.id_recurso
      inner join
      persona p
      on pr.id_persona = p.id
      inner join
      entidad tipoent
      ON rcd.id_tipo = tipoent.id_correlativo
      where rcd.id = rc.id and tipoent.id_tabla = 5 and pr.fecha_liberacion is null) nombres,
      CASE
        WHEN r.estado = 0 THEN 'Reservado'
        ELSE 'Disponible'
      END estado
          FROM
              recurso_cuenta rc
                  INNER JOIN
              recurso r ON rc.id = r.id
                  INNER JOIN
              entidad tipo ON rc.id_tipo = tipo.id_correlativo
                  AND tipo.id_tabla = 5
          WHERE
      (@param_usuario IS NULL OR rc.usuario LIKE CONCAT('%',@param_usuario,'%'))
      AND (@param_id_estado IS NULL OR r.estado = @param_id_estado)
              AND r.eliminacion_logica = 1
    order by r.id asc;
      "
  },
  {
      "id": 47,
      "type": 1,
      "description": "Todas las tablas",
      "sql": "
    select id_correlativo id,
    valor_texto_1 nombre,
    valor_texto_2 descripcion,
    idPadre
    from entidad
    where id_tabla = 0 and estado = 1;
      "
  },
  {
      "id": 48,
      "type": 1,
      "description": "Info tabla",
      "sql": "
      select e.id_correlativo id,
      e.valor_texto_1 nombre,
      e.valor_texto_2 descripcion,
      (select ent.valor_texto_1 nombre from entidad ent where ent.id = e.idPadre) nombrePadre
      from entidad e
      where e.id_tabla = @param_id_tabla and estado = 1
      order by e.id_correlativo asc;
      "
  },
  {
      "id": 49,
      "type": 4,
      "description": "agregar entidad",
      "sql": "
          CALL prc_ins_entidad(
              @param_nombre,
              @param_descripcion,
      @param_padre_id,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 50,
      "type": 4,
      "description": "agregar info entidad",
      "sql": "
          CALL prc_ins_info_entidad(
              @param_nombre,
              @param_descripcion,
      @param_id_padre,
      @param_id_tabla,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 51,
      "type": 1,
      "description": "Desplegable entidad",
      "sql": "
      select id_correlativo id,valor_texto_1 nombre
      from entidad
      where id_tabla = 0
      and estado = 1;
      "
  },
  {
      "id": 52,
      "type": 1,
      "description": "Desplegable por entidad",
      "sql": "
      select id,valor_texto_1 nombre
      from entidad
      where id_tabla = @param_id_tabla
      and estado = 1;
      "
  },
{
  "id": 53,
  "type": 6,
  "description": "Delete info entidad",
  "sql": "
    CALL prc_delete_info_entidad(
    @param_id_tabla,
    @param_id_correlativo,
    @CONFIG_USER_ID,
    @CONFIG_OUT_MSG_ERROR,
    @CONFIG_OUT_MSG_EXITO )
  "
},
  {
      "id": 54,
      "type": 1,
      "description": "Get one info entidad",
      "sql": "
      select e.id,
      e.id_tabla idTabla,
      e.id_correlativo idInfo,
      e.valor_texto_1 nombre,
      e.valor_texto_2 descripcion,
      (select ent.id from entidad ent where ent.id = e.idPadre) idPadre,
      (select ent.valor_texto_1 from entidad ent where ent.id = e.idPadre) nombrePadre,
      (select ent.id_tabla from entidad ent where ent.id = e.idPadre) idTablaEntidad,
      (select ent.valor_texto_1 from entidad ent where ent.id_correlativo = (select ent.id_tabla from entidad ent where ent.id = e.idPadre) and ent.id_tabla = 0) NombreTablaEntidad,
      (select ent.id_correlativo from entidad ent where ent.id = e.idPadre) idCorrelativoPadre
      from entidad e
      where e.id_tabla = @param_id_tabla and e.id_correlativo = @param_id_correlativo and e.estado = 1;
      "
  },
  {
      "id": 55,
      "type": 1,
      "description": "Get one info entidad 2",
      "sql": "
      select id idPadre,
      id_correlativo idCorrelativo,
      valor_texto_1
      from entidad where id_tabla = @param_id_tabla and estado = 1;
      "
  },
  {
      "id": 56,
      "type": 5,
      "description": "Update info entidad",
      "sql": "
          CALL prc_update_info_entidad(
              @param_id,
              @param_tabla,
              @param_correlativo,
              @param_nombre,
              @param_descripcion,
              @param_padre,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
  {
      "id": 57,
      "type": 1,
      "description": "Get historico proyectos",
      "sql": "
          select pp.id_persona, pp.id_proyecto, e.valor_texto_1 as proyecto_codigo,
          e.valor_texto_2 as proyecto_descripcion,
          DATE_FORMAT(pp.fecha_asignacion, '%Y-%m-%d') as fecha_asignacion,
          id_usuario_asignacion, u.usuario as nombre_usuario_asignacion
          from persona_proyectos pp
          left join entidad e on e.id_tabla = 1 and e.id_correlativo = pp.id_proyecto
          left join usuario u on u.id = pp.id_usuario_asignacion
          where pp.id_persona = @param_id_persona
      "
  },
{
      "id": 58,
      "type": 1,
      "description": "Get all usuario",
      "sql": "
    select u.id,u.usuario,u.clave,
    pl.rol perfil,
    concat(p.nombres,', ',p.apellido_paterno,' ',p.apellido_materno) nombre
    from usuario u
    left join perfil pl
    on u.id_perfil = pl.id
    left join persona p
    on u.id_persona = p.id and p.eliminacion_logica = 1;
      "
  },
{
      "id": 59,
      "type": 1,
      "description": "Get all perfil para usuario",
      "sql": "
    select id,rol from perfil
      "
  },
    {
      "id": 60,
      "type": 4,
      "description": "agregar usuario",
      "sql": "
          CALL prc_ins_usuario(
              @param_usuario,
              @param_clave,
      @param_perfil_id,
      @param_persona_id,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },
   {
      "id": 61,
      "type": 1,
      "description": "Get one usuario",
      "sql": "
    select u.id,u.usuario,u.clave,
    pl.id idPerfil,pl.rol perfil,
          p.id idPersona,concat(p.nombres,', ',p.apellido_paterno,' ',p.apellido_materno) nombre
    from usuario u
    left join perfil pl
    on u.id_perfil = pl.id
    left join persona p
    on u.id_persona = p.id
          where u.id = @param_id_usuario"
},
    {
      "id": 62,
      "type": 5,
      "description": "Update one usuario",
      "sql": "
          CALL prc_update_usuario(
              @param_id,
              @param_usuario,
              @param_clave,
      @param_perfil,
              @param_persona,
              @CONFIG_USER_ID,
              @CONFIG_OUT_MSG_ERROR,
              @CONFIG_OUT_MSG_EXITO
          )
      "
  },


  {
      "id": 63,
      "type": 1,
      "description": "Get all Estados",
      "sql": "
          SELECT * FROM entidad WHERE id_tabla = 7 AND estado = 1 and id not in (182,183) order by id_correlativo asc;
      "
  },
  {
      "id": 64,
      "type": 1,
      "description": "get one registro facturacion",
      "sql": "
         select *,idFactura,substring(periodo,1,4) as anio,substring(periodo,6,2) as mes from facturacion where idfactura = @p_id "
  },

   {
      "id": 65,
      "type": 1,
      "description": "Get proyectos",
      "sql": "
      SELECT
             *
          FROM entidad
          WHERE id_tabla = 1 AND estado = 1
    order by valor_texto_1 asc;
      "
  },
  {
      "id": 66,
      "type": 5,
      "description": "update registro facturacion",
      "sql": "
      CALL prc_update_facturacion(@p_id_factura,@p_periodo,@p_id_proyecto ,@p_id_liquidacion,@p_subservicio,@p_id_gestor,@p_venta_declarada,@p_id_estado,@p_orden_compra,@p_certificacion,@p_factura,@p_monto_facturado,@p_comentariosGenerales,@p_fecha_actualizacion,@p_user_actualizacion,@CONFIG_OUT_ID, @CONFIG_OUT_MSG_ERROR, @CONFIG_OUT_MSG_EXITO)"
  },
  {
      "id": 67,
      "type": 1,
      "description": "get registro audio",
      "sql": "
           select sg.idFactCambio, sg.idFactura  ,sg.idEstado ,e1.valor_texto_1 as estado ,
          sg.idProyecto, e2.valor_texto_1 as proyecto,sg.venta_declarada ,
          sg.usuario ,us.usuario as name,DATE_FORMAT(sg.dFecha , '%d/%m/%Y %H:%i:%s') as fecha
          from facturacion_cambios as sg
          left join entidad e1 on  sg.idEstado = e1.id  and e1.id_tabla = 7
          left join entidad e2 on  sg.idProyecto = e2.id  and e2.id_tabla = 1
          left join usuario us on sg.usuario = us.id
          where sg.idFactura = @p_id
          order by sg.dFecha;"
  },
   {
      "id": 68,
      "type": 1,
      "description": "get registro facturacion",
      "sql": "
        SELECT f.idFactura,DATE_FORMAT(f.periodo , '%Y/%m') as periodo ,e2.valor_texto_1 as proyecto,e3.valor_texto_1 as liquidacion,f.subServicio ,
case WHEN  e4.valor_texto_1 is not null  THEN  e4.valor_texto_1 ELSE f.gestor end as gestor,
e1.valor_texto_1 as estado,f.orden_compra ,
f.cod_certificacion,f.factura,f.venta_declarada as importe,sum(fc.importe) as facturado
,(select sum(venta_declarada) from facturacion_venta_declarada where idFactura = f.idFactura group by idFactura ) as declarado
from facturacion f
left join entidad e1 on f.idEstado = e1.id       and e1.id_tabla = 7
left join entidad e2 on f.idProyecto = e2.id     and e2.id_tabla = 1
left join entidad e3 on f.idLiquidacion = e3.id  and e3.id_tabla = 9
left join entidad e4 on f.idGestor = e4.id       and e4.id_tabla = 8
left join facturacion_certificacion fc on f.idFactura =  fc.idFactura
where ver_estado = 1
group by f.idFactura,f.periodo,e2.valor_texto_1 ,f.subServicio ,f.gestor ,e1.valor_texto_1 ,e3.valor_texto_1,e4.valor_texto_1 ,f.orden_compra ,f.cod_certificacion,f.factura
order by f.idFactura desc,f.periodo desc;
             "
  },
  {
      "id": 69,
      "type": 1,
      "description": "eliminar one registro seguimiento",
      "sql": "
     update facturacion
      set ver_estado = 0
      where idFactura =  @p_id "
  },{
      "id": 70,
      "type": 4,
      "description": "insert new registro seguimiento",
      "sql": "CALL prc_creacion_facturacion(
      @p_periodo,
      @p_id_proyecto ,
      @p_id_liquidacion,
      @p_subservicio,
      @p_id_gestor,
      @p_venta_declarada,
      @p_id_estado,
      @p_orden_compra,
      @p_certificacion,
      @p_factura,
      @p_monto_facturado,
      @p_comentariosGenerales,
      @p_user_creacion,
      @p_fecha_creacion,
      @CONFIG_OUT_ID,
      @CONFIG_OUT_MSG_ERROR,
       @CONFIG_OUT_MSG_EXITO)
      "
  },
  {
      "id": 71,
      "type": 1,
      "description": "Listar factura certificada",
      "sql": "
          select idFactCertificacion,idFactura ,oc, importe, certificacion,factura,
          DATE_FORMAT(fecha_facturacion , '%d/%m/%Y') as fecha_facturacion,comentario
          ,e1.valor_texto_1 as estado
          from facturacion_certificacion
          left join entidad e1 on idEstado = e1.id  and e1.id_tabla = 7 where idFactura = @p_id "
  },
   {
      "id": 72,
      "type": 1,
      "description": "Listar factura de venta declarada",
      "sql": "
          select idFactVenta,idFactura,DATE_FORMAT(periodo, '%Y/%m') as periodo ,venta_declarada,comentario from facturacion_venta_declarada where idFactura = @p_id "
  },
   {
      "id": 73,
      "type": 4,
      "description": "agregar factura certificada",
      "sql": "
          CALL prc_ins_registro_factura_certificacion(
              @param_id_factura,
              @param_fecha_facturacion,
              @param_importe,
              @param_orde_compra,
              @param_certificacion,
              @param_id_estado,
              @param_factura,
              @param_fecha_creacion,
              @param_comentario,
              @param_usuario_creacion
          )
      "
  },
   {
      "id": 74,
      "type": 1,
      "description": "agregar detalle facturacion",
      "sql": "
          select *,DATE_FORMAT(fecha_facturacion,'%Y-%m-%d') as f_facturacion from facturacion_certificacion where idFactCertificacion = @p_id;"
  },
  {
      "id": 75,
      "type": 5,
      "description": "update registro facturacion certificacion",
      "sql": "
      CALL prc_update_facturacion_certificacion(@p_idFactCertificacion,@p_fecha_facturacion,@p_importe,@p_oc,@p_certificacion,@p_idEstado,@p_factura,@p_fecha_actualizacion,@p_comentario,@p_usuario)"
  },
  {
      "id": 76,
      "type": 1,
      "description": "delete registro facturacion certificacion",
      "sql": "
      delete from facturacion_certificacion where idFactCertificacion = @p_id;
      "
  },
  {
      "id": 77,
      "type": 1,
      "description": "ver detalle venta declarada",
      "sql": "
          select *,DATE_FORMAT(periodo ,'%Y-%m-%d') as f_periodo from facturacion_venta_declarada where idFactVenta = @p_id;"
  },
  {
      "id": 78,
      "type": 1,
      "description": "update registro facturacion venta declarada",
      "sql": "
       CALL prc_update_facturacion_venta_declarada(@p_idfacturaventa,@p_periodo,@p_venta_declara,@p_comentario,@p_fecha_actualizacion,@p_usuario)"
  },
  {
      "id": 79,
      "type": 1,
      "description": "delete registro facturacion venta declarada",
      "sql": "
      delete from facturacion_venta_declarada where idFactVenta = @p_id;
      "
  },
  {
      "id": 80,
      "type": 4,
      "description": "agregar factura venta declarada",
      "sql": "
          CALL prc_ins_registro_factura_venta_declarada(
              @param_id_factura
              ,@param_periodo
              ,@param_venta_declarada
              ,@param_comentario
              ,@param_fecha_creacion
              ,@param_usuario_creacion
          )
      "
  },
   {
      "id": 81,
      "type": 1,
      "description": "update registros masivo proyecto - estado",
      "sql": "
       CALL prc_update_masivo_proyectos(@p_idproyecto,@p_idestado,@p_periodo,@p_fecha_actualizacion,@p_usuario)"
  },
   {
      "id": 82,
      "type": 1,
      "description": "Get all Liquidaciones",
      "sql": "
          SELECT
              *
          FROM entidad
          WHERE id_tabla = 9 AND estado = 1
    order by id_correlativo asc;
      "
  },
  {
      "id": 83,
      "type": 1,
      "description": "Get all Gestores",
      "sql": "
          SELECT
              *
          FROM entidad
          WHERE id_tabla = 8 AND estado = 1 and idPadre = @p_idproyecto
          order by id_correlativo asc;
      "
  },
   {
      "id": 84,
      "type": 1,
      "description": "Get all Estados para facturacion",
      "sql": "
          SELECT * FROM entidad WHERE id_tabla = 7 AND estado = 1 and id  in (182,183,663) order by id_correlativo asc;
      "
  },
   {
      "id": 85,
      "type": 1,
      "description": "Last id de facturacion detalle",
      "sql": "
          SELECT MAX(idFactura) as last_idfacturacion FROM facturacion;
      "
  },
  {
      "id": 86,
      "type": 4,
      "description": "duplicidad new registro facturacion",
      "sql": "CALL prc_duplicidad_facturacion(
      @p_periodo,
      @p_id_proyecto ,
      @p_id_liquidacion,
      @p_subservicio,
      @p_id_gestor,
      @p_venta_declarada,
      @p_id_estado,
      @p_comentariosGenerales,
      @p_user_creacion,
      @p_fecha_creacion,
      @CONFIG_OUT_ID,
      @CONFIG_OUT_MSG_ERROR,
       @CONFIG_OUT_MSG_EXITO)
      "
  },
  {
      "id": 87,
      "type": 1,
      "description": "Reporte facturado",
      "sql": "
SELECT f.idFactura,DATE_FORMAT(f.periodo , '%Y/%m') as periodo ,e2.valor_texto_1 as proyecto,e3.valor_texto_1 as liquidacion,f.subServicio ,
case WHEN  e4.valor_texto_1 is not null  THEN  e4.valor_texto_1 ELSE f.gestor end as gestor,
e1.valor_texto_1 as estado,f.venta_declarada as importe,
fc.oc,fc.importe as importe_facturado,fc.certificacion , e5.valor_texto_1 as estado_facturacion,fc.factura,  DATE_FORMAT(fc.fecha_facturacion  , '%d/%m/%Y')   as  fecha_facturacion,
fc.comentario
from facturacion f
left join entidad e1 on f.idEstado = e1.id       and e1.id_tabla = 7
left join entidad e2 on f.idProyecto = e2.id     and e2.id_tabla = 1
left join entidad e3 on f.idLiquidacion = e3.id  and e3.id_tabla = 9
left join entidad e4 on f.idGestor = e4.id       and e4.id_tabla = 8
left join facturacion_certificacion fc on f.idFactura =  fc.idFactura
left join entidad e5 on fc.idEstado = e5.id       and e5.id_tabla = 7
where ver_estado = 1
order by f.idFactura desc,f.periodo desc;
      "
  },
  {
      "id": 88,
      "type": 1,
      "description": "Reporte venta declarada",
      "sql": "
      SELECT f.idFactura,DATE_FORMAT(f.periodo , '%Y/%m') as periodo ,e2.valor_texto_1 as proyecto,e3.valor_texto_1 as liquidacion,f.subServicio ,
      case WHEN  e4.valor_texto_1 is not null  THEN  e4.valor_texto_1 ELSE f.gestor end as gestor,
      e1.valor_texto_1 as estado,f.venta_declarada as importe,
      DATE_FORMAT(fvd.periodo  , '%Y/%m') as  periodo_venta_declarada,fvd.venta_declarada ,fvd.comentario
      from facturacion f
      left join entidad e1 on f.idEstado = e1.id       and e1.id_tabla = 7
      left join entidad e2 on f.idProyecto = e2.id     and e2.id_tabla = 1
      left join entidad e3 on f.idLiquidacion = e3.id  and e3.id_tabla = 9
      left join entidad e4 on f.idGestor = e4.id       and e4.id_tabla = 8
      left join facturacion_venta_declarada  fvd on f.idFactura =  fvd.idFactura
      where ver_estado = 1
      order by f.idFactura desc,f.periodo desc;
      "
  },
  {
      "id": 89,
      "type": 1,
      "description": "Get all Gestores",
      "sql": "
          SELECT * FROM entidad
          WHERE id_tabla = 8 AND estado = 1
          order by valor_texto_1  asc;
      "
  },
]




 */
