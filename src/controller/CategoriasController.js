import { Router } from "express";
import { ConsultarAlianca, ConsultarColar, ConsultarAnel, ConsultarBrinco, ConsultarNamorados, ConsultarPet } from '../repositories/CategoriasRepository.js';

const endpoints = Router();


endpoints.get('/aliancas', async (req, resp) => {
  try {
      const r = await ConsultarAlianca();
      resp.send(r)
  }

  
  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/pets', async (req, resp) => {
  try {
      const r = await ConsultarPet();
      resp.send(r)
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/colares', async (req, resp) => {
  try {
      const r = await ConsultarColar();
      resp.send(r)
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/aneis', async (req, resp) => {
  try {
      const r = await ConsultarAnel();
      resp.send(r)
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/brincos', async (req, resp) => {
  try {
      const r = await ConsultarBrinco();
      resp.send(r)
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

endpoints.get('/namorados', async (req, resp) => {
  try {
      const r = await ConsultarNamorados();
      resp.send(r)
  }

  catch (err) {
    resp.status(400).send({
      erro: err.message
    })
  }
})

export default endpoints;