import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const getTeam = async (req: Request, res: Response) => {
  try {
    const businessId = (req as any).user.businessId;
    const team = await User.find({ businessId, role: { $in: ['business_owner', 'agent'] } });
    res.json(team);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addAgent = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const businessId = (req as any).user.businessId;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'agent',
      businessId
    });
    await user.save();

    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const removeAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const businessId = (req as any).user.businessId;

    const agent = await User.findOne({ _id: id, businessId, role: 'agent' });
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    await agent.deleteOne();
    res.json({ message: 'Agent removed' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
