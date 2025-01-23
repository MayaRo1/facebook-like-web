
function Share() {

    return (
        <div class="modal-dialog modal-dialog-scrollable"><br></br>
            <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Share</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-light">email</button><br></br>
                                <button type="button" class="btn btn-light">whatsapp</button><br></br>
                                <button type="button" class="btn btn-light">instagram</button><br></br>
                                <button type="button" class="btn btn-light">skype</button><br></br>
                                <button type="button" class="btn btn-light">youtube</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Share