//Sheng-Yu Wu
export function renderProfile(data) {
    const appContainer = document.getElementById('app');
    console.log('----------test---------');
    // console.log(data.userData);
    console.log('-------------------');
    appContainer.innerHTML = `
        <section class="Alan-profilePageSection">
            <div class="Alan-profileCard">

                <p class="Alan-profileTitle">My Profil</p>
                <div class="Alan-profileImg-container">
                    <img class="Alan-profileImage" src="https://thispersondoesnotexist.com/" alt="Profile Picture Here">
                </div>
                <div class="Alan-profileTextRow">
                    <p class="Alan-profileTextContent">My Profil</p>
                    <p class="Alan-profileTextContent">My Profil</p>
                </div>
                <div class="Alan-profileTextRow">
                    <p class="Alan-profileTextContent">My Profil</p>
                    <p class="Alan-profileTextContent">My Profil</p>
                </div>
                <div class="Alan-profileTextRow">
                    <p class="Alan-profileTextContent">Account</p>
                    <button class="Alan-profileTextContent">Charge</button>

                </div>
            </div>
        </section>

	`;
}
