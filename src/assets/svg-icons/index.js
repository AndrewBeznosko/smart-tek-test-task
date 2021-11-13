const req = require.context('./', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);

// TODO: check with article https://russianblogs.com/article/88551468292/
