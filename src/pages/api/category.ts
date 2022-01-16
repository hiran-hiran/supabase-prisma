import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const data = await prisma.category.findMany({
          where: {
            authorId: req.query.authUserId as string,
          },
        });
        res.status(200).send(data);
      } catch (error) {
        console.log(error);
      }
      break;

    case 'POST':
      try {
        const data = await prisma.category.create({
          data: {
            authorId: req.body.authUserId as string,
            title: req.body.title as string,
          },
        });
        console.log({ data });

        res.status(200).send(data);
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      break;
  }
}
