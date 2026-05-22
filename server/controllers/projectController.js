const Project = require('../models/Project');
const User = require('../models/User');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { 'members.user': req.user._id }],
      isArchived: false,
    }).populate('owner', 'name avatar').populate('members.user', 'name avatar');
    res.json(projects);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createProject = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const project = await Project.create({
      name, description, color, owner: req.user._id,
      members: [{ user: req.user._id, role: 'admin' }],
    });
    res.status(201).json(project);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name avatar').populate('members.user', 'name avatar email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.name = req.body.name || project.name;
    project.description = req.body.description ?? project.description;
    project.color = req.body.color || project.color;
    const updated = await project.save();
    res.json(updated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const inviteMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) return res.status(404).json({ message: 'No user found with that email' });
    const alreadyMember = project.members.find(m => m.user.toString() === userToInvite._id.toString());
    if (alreadyMember) return res.status(400).json({ message: 'User is already a member' });
    project.members.push({ user: userToInvite._id, role: role || 'member' });
    await project.save();
    res.json({ message: 'Member invited', project });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.members = project.members.filter(m => m.user.toString() !== req.params.userId);
    await project.save();
    res.json({ message: 'Member removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getProjects, createProject, getProjectById, updateProject, deleteProject, inviteMember, removeMember };