import React from 'react';
import { Segment, Header, Button, Label } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../common/form/MyTextInput';
import { updateUserPassword } from '../../firestore/firebaseService';

export default function AccountPage() {
	return (
		<Segment>
			<Header dividing size='large' content='Account' />
			<>
				<div>Use this form to change your password</div>
				<Formik
					initialValues={{ newPassword1: '', newPassword2: '' }}
					validationSchema={Yup.object({
						newPassword1: Yup.string().required('Password is required'),
						newPassword2: Yup.string().oneOf(
							[Yup.ref('newPassword1'), null],
							'Passwords do not match',
						),
					})}
					onSubmit={async (values, { setSubmitting, setErrors }) => {
						try {
							await updateUserPassword(values);
						} catch (error) {
							setErrors({ auth: error.message });
						} finally {
							setSubmitting(false);
						}
					}}
				>
					{({ errors, isSubmitting, isValid, dirty }) => (
						<Form className='ui form'>
							<MyTextInput name='newPassword1' type='password' placeholder='New Password' />
							<MyTextInput name='newPassword2' type='password' placeholder='Confirm Password' />
							{errors.auth && (
								<Label basic color='red' style={{ marginBottom: '10' }} content={errors.auth} />
							)}
							<Button
								type='submit'
								style={{ display: 'block' }}
								loading={isSubmitting}
								disabled={!isValid || isSubmitting || !dirty}
								size='small'
								positive
								content='Update Password'
							/>
						</Form>
					)}
				</Formik>
			</>

			{/* {currentUser.providerId === 'facebook' && (
				<>
					<Header color='teal' sub content='Facebook Account' />
					<p>Please visit Facebook to update your account</p>
					<Button
						icon='facebook'
						color='facebook'
						as={Link}
						to='https://facebook.com'
						content='Go to Facebook '
					/>
				</>
			)}
			{currentUser.providerId === 'google' && (
				<>
					<Header color='teal' sub content='Google Account' />
					<p>Please visit Google to update your account</p>
					<Button
						icon='google'
						color='google'
						as={Link}
						to='https://google.com'
						content='Go to Google '
					/>
				</>
			)} */}
		</Segment>
	);
}
