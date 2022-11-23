import styled from 'styled-components';
import swal from 'sweetalert';

export default function SignUpPage() {
	function testeSweet() {
		swal('Título', 'Texto', { icon: 'success', buttons: [true, true] });
	}
	return (
		<SignUpContainer>
			<p>Sign-Up</p>
			<button onClick={testeSweet}>Teste SweetAlert</button>
		</SignUpContainer>
	);
}

const SignUpContainer = styled.div``;
