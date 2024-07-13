import { makeHandler } from '~/lib/core/make-handler';

export const me = makeHandler({}, (req, res) => {
  return res.status(200).send(req.user);
});
