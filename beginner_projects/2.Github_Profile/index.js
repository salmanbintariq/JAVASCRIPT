let githubProfileUrl = '';
const searchbtn=document.getElementById('search_btn');
const checkProfile = document.getElementById('check_profile_btn');
const url = "https://api.github.com/users/";
const fetchGithubProfile=async()=>{
    const searchInput=document.getElementById('searchInput');
    const username=searchInput.value.trim(); //.trim() removes whitespace to avoid errors.
    if (!username){
        alert("Please enter a username!")
        return
    }

    try{
        const res=await fetch(`${url}${username}`);
        if (!res.ok) throw new Error(`User not found (HTTP ${res.status})`); //res.ok checks for HTTP errors (e.g., 404 if user doesn’t exist).
        const data=await res.json();
        
        //UPDATE DOM
        document.querySelector('.avatar img').src=data.avatar_url || 'avatar.jpg';
        document.querySelector('.self h1:nth-child(1)').textContent=data.name || 'No-name'
        document.querySelector('.self h1:nth-child(2)').textContent=`@${data.login}`;
        document.querySelector('.about p').textContent = data.bio || "No bio";
        document.querySelector('.status-item:nth-child(1) p').textContent=data.followers;
        document.querySelector('.status-item:nth-child(2) p').textContent=data.following;
        document.querySelector('.status-item:nth-child(3) p').textContent=data.public_repos;

        githubProfileUrl=data.html_url;
        searchInput.value="";

    }catch (err){
        console.error(err);
        alert("Failed to fetch profile. Check username or try later.");
    };
};
document.addEventListener('DOMContentLoaded',()=>{
    searchbtn.addEventListener('click',fetchGithubProfile);

    //Redirect to GitHub profile when "Check Profile" is clicked
    checkProfile.addEventListener('click',()=>{
        if (!githubProfileUrl){
            alert('No profile fetched yet. Search for a user first!')
        }else{
            window.open(githubProfileUrl, '_blank'); //Open in new-tab
        }
    });
});
