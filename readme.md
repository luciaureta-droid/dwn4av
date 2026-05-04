# 1 La url no hace referencia a la accion, sino que identifica un recurso

URL-> Uniform resource locator
URI-> uniform resourece Identificar
 
 /productos/nuevo  ->  x
 /productos/edit/18 -> x
 /productos       -> ok!

 # 2.Las acciones se definen con los verbos http 
  GET    -> obtener
  POST  -> Crear
  Put  -> reemplazar
  PATH -> Actualizar
  DELETE -> Borrar

  # 3. Los datos de los recuros son transportados utilizando JSON

  # 4. Los esetados de una peticion son definidos por el status code
  1xx   -> Informativos
  2xx  -> Todo salio Bien!
  3xx  -> El recurso cambio de lugar
  4xx  -> Error del usuario
