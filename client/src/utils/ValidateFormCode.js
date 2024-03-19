export const ValidateFormEmail = (email) => {
	if (email?.length === 0) {
		return "Please Enter Email ";
	}
	const emailCheck = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

	if (!emailCheck) {
		return "Invalid Email Format";
	}
	return null;
};
