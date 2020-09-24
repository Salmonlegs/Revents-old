import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';
import * as Yup from 'yup';
import { addEventChatComment } from '../../../firestore/firebaseService';

export default function EventDetailedChatForm({ parentId, eventId, closeForm }) {
	return (
		<Formik
			initialValues={{ comment: '' }}
			validationSchema={Yup.object({
				comment: Yup.string().required(),
			})}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				try {
					setSubmitting(true);
					await addEventChatComment(eventId, { ...values, parentId });
					resetForm();
				} catch (error) {
					toast.message(error);
				} finally {
					setSubmitting(false);
					closeForm({ open: false, commentId: null });
				}
			}}
		>
			{({ isSubmitting, handleSubmit, isValid }) => (
				<Form className='ui form'>
					<Field name='comment'>
						{({ field }) => (
							<div style={{ position: 'relative' }}>
								<Loader active={isSubmitting} />
								<textarea
									rows={2}
									{...field}
									placeholder='Enter your comment (enter to submit || enter + shift for new line'
									onKeyPress={(e) => {
										if (e.key === 'Enter' && e.shiftKey) {
											return;
										}
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault();
											isValid && handleSubmit();
										}
									}}
								></textarea>
							</div>
						)}
					</Field>
				</Form>
			)}
		</Formik>
	);
}
