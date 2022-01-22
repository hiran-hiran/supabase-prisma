import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: req.query.id as string,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}
