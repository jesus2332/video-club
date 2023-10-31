const express = require('express');
const Member = require('../models/member');


function create(req,res,next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    
    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;


    let member = new Member({
        name: name,
        lastName:lastName,
        phone:phone,
        address,address
    });

    member.save().then(obj => res.status(200).json({
        msg:"Socio creado correctamente ",
        obj:obj
    })).catch(ex => res.status(500).json({
        msg: "NO se pudo almacenar el socio",
        obj:ex
    }));


}
async function list(req, res, next) {
    try {
      const members = await Member.find({});
      res.status(200).json({
        msg: 'Lista de socios',
        members,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async function index(req, res, next) {
    try {
      const memberId = req.params.id;
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({
          msg: `Socio con el ID ${memberId} no encontrado`,
          obj: null,
        });
      }
      res.status(200).json({
        msg: 'Detalle de socio',
        obj: member,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async function replace(req, res, next) {
    try {
      const memberId = req.params.id;
      const { name, lastName, phone, address } = req.body;
      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        { _name: name, _lastName: lastName, _phone: phone, _address: address },
        { new: true }
      );
  
      if (!updatedMember) {
        return res.status(404).json({
          msg: `Socio con el ID ${memberId} no encontrado`,
          obj: null,
        });
      }
  
      res.status(200).json({
        msg: 'Socio reemplazado correctamente',
        obj: updatedMember,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      const memberId = req.params.id;
      const { name, lastName, phone, address } = req.body;
      const updatedFields = {};
      if (name) updatedFields._name = name;
      if (lastName) updatedFields._lastName = lastName;
      if (phone) updatedFields._phone = phone;
      if (address) updatedFields._address = address;
  
      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        updatedFields,
        { new: true }
      );
  
      if (!updatedMember) {
        return res.status(404).json({
          msg: `Socio con el ID ${memberId} no encontrado`,
          obj: null,
        });
      }
  
      res.status(200).json({
        msg: 'Socio actualizado correctamente',
        obj: updatedMember,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async function destroy(req, res, next) {
    try {
      const memberId = req.params.id;
      const deletedMember = await Member.findByIdAndRemove(memberId);
  
      if (!deletedMember) {
        return res.status(404).json({
          msg: `Socio con el ID ${memberId} no encontrado`,
          obj: null,
        });
      }
  
      res.status(200).json({
        msg: 'Socio eliminado correctamente',
        obj: deletedMember,
      });
    } catch (error) {
      next(error);
    }
  }


module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};