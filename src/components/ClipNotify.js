const ClipNotify = ({ clip: { url, error, embed_url } }) => {
  return (
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">{error?'Error':'New Clip'}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">
        <span>{error?'Error before create a clip':`Clip created: ${url}`}</span>
        {
          error ? null : <iframe src={embed_url} height={120} width={120}></iframe>
        }
      </div>
    </div>
  );
};
export default ClipNotify;
