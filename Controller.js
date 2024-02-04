const { toInt } = require('validator');
const Form = require('../Registration-Form/Form');
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
exports.formLogin = async (req, res, next) => {
  try {
    let { fname, mname, sname, phone, email, password, year, month, day } =
      req.body;
    const name = fname+" "+mname+" "+sname;
    const dt = `${month} ${day}, ${year}`;
    const DOB = new Date(dt);
    console.log(DOB);
    const form = await Form.create({
      name,
      phone,
      email,
      password,
      DOB
    });
    res.status(200).json({
      status: 'success',
      data: form,
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
    data:err.message
    });
    console.log(err)
  }
};


exports.Form = (req, res)=>{
  res.status(200).render('form')
}