const BASE_URL = 'http://localhost:8000';



async function callApi(endpoint, options={}){

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}



const api = {
  user:{
    login(data){
      return callApi('/user/login/',{
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    register(data){
      return callApi('/user/register/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    update(id, data){
      return callApi(`/user/list/${id}/`,{
        method: 'PUT',
        body: JSON.stringify(data)
      })
    }
  },
  create:{
    rol(data){
      return callApi('/user/createRol/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    tipoResidente(data){
      return callApi('/create/tipoResidente/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    tipoVehiculo(data){
      return callApi('/create/tipoVehiculo/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    tarifa(data){
      return callApi('/create/tarifa/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    vehiculo(data){
      return callApi('/create/vehiculo/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    ticker(data){
      return callApi('/create/ticker/',{
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    caja(){
      return callApi('/create/caja/',{
        method: 'POST'
      })
    }
  },
  getData:{
    tipoVehiculo(){
      return callApi('/create/tipoVehiculo/',{
        method: 'GET'
      })
    },
    tipoResidente(){
      return callApi('/create/tipoResidente/',{
        method: 'GET'
      })
    },
    rol(){
      return callApi('/user/createRol/',{
        method: 'GET'
      })
    },
    ticker(id, isParking){
      return callApi(`/create/ticker/?id=${id}&isParking=${isParking}`,{
        method: 'GET'
      })
    },
    tarifa(id){
      return callApi(`/create/tarifa/${id}/`,{
        method: 'GET'
      })
    },
    tarifa2(no_tarifa){
      return callApi(`/create/tarifa/?no_tarifa=${no_tarifa}`,{
        method: 'GET'
      })
    },
    getAll(url){
      return callApi(`${url}/`,{
        method: 'GET'
      })
    },
    cajaAll(){
      return callApi(`/create/caja/`,{
        method: 'GET'
      })
    },
    caja(estado){
      return callApi(`/create/caja/?estado=${estado}`,{
        method: 'GET'
      })
    }
  },
  deleteData:{
    tupla(id, url){
      return callApi(`${url}/${id}/`,{
        method: 'DELETE'
      })
    }
  },
  putData:{
    ticker(id, data){
      return callApi(`/create/ticker/${id}/`,{
        method: 'PUT',
        body: JSON.stringify(data)
      })
    },
    caja(id, data){
      return callApi(`/create/caja/${id}/`,{
        method: 'PUT',
        body: JSON.stringify(data)
      })
    }
  },
  
}

export default api;