import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employees/servicesEmployess';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from "react-input-mask";
import './EmployeeForm.scss';

const EmployeeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(state => state.employees.employees);
  const employee = employees.find((employee) => employee.id === id);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthday: '',
    role: 'driver',
    isArchive: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Имя обязательно";
    if (!formData.phone) newErrors.phone = "Телефон обязателен";
    else if (!/^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) newErrors.phone = "Введите правильный номер телефона";
    if (!formData.birthday) newErrors.birthday = "День рождения обязателен";
    else if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formData.birthday)) newErrors.birthday = "Введите правильную дату рождения";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (id) {
      dispatch(updateEmployee(formData));
    } else {
      dispatch(addEmployee({ ...formData, id: Date.now() }));
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div>
        <label>Имя</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Телефон</label>
        <InputMask mask="+7 (999) 999-9999" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>
      <div>
        <label>День рождения</label>
        <InputMask mask="99.99.9999" type="text" name="birthday" value={formData.birthday} onChange={handleChange} required />
        {errors.birthday && <div className="error">{errors.birthday}</div>}
      </div>
      <div>
        <label>Должность</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="driver">Водитель</option>
          <option value="waiter">Официант</option>
          <option value="cook">Повар</option>
        </select>
      </div>
      <div>
        <label>Архив</label>
        <input type="checkbox" name="isArchive" checked={formData.isArchive} onChange={handleChange} />
      </div>
      <div className="buttons">
        <button type="submit" className="button">Сохранить</button>
        <button onClick={() => navigate('/')} className='link_to_main'>
          На главную
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;