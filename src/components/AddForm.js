import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addSmurf, getSmurf } from '../actions/index';
import * as Yup from 'yup';

const initialFormValues = {
  name: '',
  position: '',
  nickname: '',
  description: '',
};
const AddForm = (props) => {
  const [formState, setFormState] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({
    name: '',
    position: '',
    nickname: '',
  });
  const [disabled, setDisabled] = useState(true);
  const formSchema = Yup.object().shape({
    name: Yup.string().required('You must include name.'),
    position: Yup.string().required('You must include position'),
    nickname: Yup.string().required('You must include nickname'),
    description: Yup.string(),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setDisabled(!valid);
    });
  }, [formState]);
  const setErrors = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    console.log(formState);
    setErrors(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSmurf = {
      id: Math.floor(Math.random()),
      name: formState.name,
      position: formState.position,
      nickname: formState.nickname,
      description: formState.description,
    };
    props.addSmurf(newSmurf);
    setFormState(initialFormValues);
  };

  return (
    <>
      <section>
        <h2>Add Smurf</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <br />
            <input
              onChange={handleChange}
              name='name'
              id='name'
              value={formState.name}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='position'>Position:</label>
            <br />
            <input
              onChange={handleChange}
              name='position'
              id='position'
              value={formState.position}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='nickname'>Nickname:</label>
            <br />
            <input
              onChange={handleChange}
              name='nickname'
              id='nickname'
              value={formState.nickname}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <br />
            <input
              onChange={handleChange}
              name='description'
              id='description'
              value={formState.description}
            />
          </div>

          <div
            data-testid='errorAlert'
            className='alert alert-danger'
            role='alert'
          >
            Error:{props.error}
            <div>{formErrors.name}</div>
            <div>{formErrors.nickname}</div>
            <div>{formErrors.position}</div>
          </div>
          <button disabled={disabled}>Submit Smurf</button>
        </form>
      </section>
      <section></section>
    </>
  );
};

export default connect(
  (state) => {
    return { error: state.error };
  },
  { addSmurf, getSmurf }
)(AddForm);

//Task List:
//1. Add in all necessary import components and library methods.
//2. Connect all needed redux state props and action functions to the component before exporting.
//3. Add state holding name, position, nickname and description to component.
//4. Build form DOM to include inputs for name, position and description of the component.
//      - an array of smurfs
//      - a boolean indicating if the app is loading
//      - error text
//      - MAKE SURE TO CORRECTLY CONNECT LABELS TO YOUR FORM INPUTS. USE THE PATERN OF SHOWN FOR NAME.
//5. Build eventhandler and listener needed to change the state.
//6. Build eventhandler and listener needed to submit a new smurf and dispatch it's assosated action.
//7. Ensure that the included alert code only displays when error text is passed in from redux.
//4. DO NOT DELETE THE data-testid FIELD FROM THE ERROR ALERT! This is used for sprint grading.
//8. Style as necessary.
