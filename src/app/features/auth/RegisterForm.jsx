import React from 'react';
import ModalWrapper from '../../common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../common/form/MyTextInput';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../common/modals/modalReducer';
import { registerInFirebase } from '../../firestore/firebaseService';

export default function RegisterForm() {
	const dispatch = useDispatch();
	return (
		<ModalWrapper size='mini' header='Register to Re-Vents'>
			<Formik
				initialValues={{
					displayName: '',
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					displayName: Yup.string().required(),
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await registerInFirebase(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (error) {
						setErrors({ auth: 'Problem with username or password' });
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty, errors }) => (
					<Form className='ui form'>
						<MyTextInput name='displayName' placeholder='Display Name' />
						<MyTextInput name='email' placeholder='Email Address' />
						<MyTextInput name='password' placeholder='Password' type='password' />
						{errors.auth && (
							<Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} />
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Register'
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
