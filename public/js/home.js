const btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click', savePost);

function deletePost(id){
    axios.delete('http://localhost:4000/posts/'+id)
        .then(result=>{
            location.reload();
        })
        .catch(err=>{
            console.log(err)
        })
}

function getPosts(){
    axios.get('http://localhost:4000/posts')
        .then(posts=>{
            console.log("posts in home.js: ",posts)
            let parentComments = document.getElementById('parent-comments')
            posts.data.data.forEach(element => {
                let childComments = document.createElement('div')
                childComments.innerHTML = 
                `
                    <div class="comments" id="comments">
                        <div class="comments-user">
                            <div class="profile-user">
                                <img src="../asset/icon/user-icon.png" alt=""> <!--profile picture (logo)-->
                                <div class="name-and-date">
                                    <h4 class="name">Anonymous</h4>
                                    <h4 class="date">Today 4:21pm - 12.06.2020</h4>
                                </div>
                                <div class = "deleteBtn" id="${element._id}" onclick="deletePost(this.id)"><button>Delete</button></div> 
                            </div>
                            <div>
                                <p>
                                    ${element.text}
                                </p>
                            </div>
                        </div>
                    </div>
                `
                parentComments.appendChild(childComments)
            });
        })
}

function savePost(){
    const formdata = new FormData(document.querySelector('form'));
    let dataToSubmit = {};
    for( var pair of formdata.entries()){
        dataToSubmit[pair[0]] = pair[1]
        console.log("pair: ",pair)
    }
    axios.post('http://localhost:4000/post', dataToSubmit)
        .then(result => {
            console.log("result: ",result)
            // render new post
            let parentComments = document.getElementById('parent-comments')
            let newChildComments = document.createElement("div")
            newChildComments.innerHTML = `
                <div class="comments-user">
                    <div class="profile-user">
                        <img src="../asset/icon/user-icon.png" alt=""> <!--progile picture (logo)-->
                        <div class="name-and-date">
                            <h4 class="name">Anonymous</h4>
                            <h4 class="date">Today 4:21pm - 12.06.2020</h4>
                        </div>
                        <div class = "deleteBtn" id = "${result._id}"onclick="deletePost(this.id)"><button>Delete</button></div> 
                    </div>
                    <div>
                        <p>
                            ${result.data.data.text}
                        </p>
                    </div>
                </div>
            `
            parentComments.appendChild(newChildComments);
        }).catch(err =>{
            console.log(err)
        })
}

getPosts() 