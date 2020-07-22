import React from 'react';
import cn from 'classnames';
import { Button } from '..';
import styles from './Footer.module.scss';
import inputStyles from '../TextField/TextField.module.scss';

export default function Footer({ compact = false }: { compact: boolean }) {
	const [email, setEmail] = React.useState('');

	async function subscribe() {
		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
			});
			if (res.ok) {
				setEmail('');
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<footer className={cn(styles.wrapper, compact && styles.compact)}>
			<div className={styles.info}>
				<h3>Subscribe to the newsletter </h3>
				<p>Be notified of new components. {compact && <br />} No spam.</p>
			</div>
			<div className={styles.subscribe}>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						className={inputStyles.input}
						type="email"
						placeholder="joe.doe@gmail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button onClick={subscribe} type="submit">
						Submit
					</Button>
				</form>
			</div>
		</footer>
	);
}