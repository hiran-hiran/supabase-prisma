import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log('req.body', req.body);

  try {
    const data = await prisma.category.findMany({
      where: {
        authorId: req.body.id,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}
