const addActivityToUser = async ({ user, message }) => {
    user.activities.push({ message });
}
export { addActivityToUser };