import {
  Bot, Languages, Workflow, Globe, Layers, Server, Smartphone, Blocks,
  Gamepad2, Glasses, Cloud, Boxes, Database, Wand2, TestTube, Code2,
  Shield, TestTube2, Cpu, HardDrive, Radio, Cog, Bot as RobotIcon,
  Palette, ShoppingCart, DollarSign, HeartPulse, CheckSquare,
  MessageCircle, FileText, Sparkles, BookOpen,
} from "lucide-react";

// Maps a category's slug (from the backend) to an icon component — kept
// separate from the Category model itself, since "which icon represents
// this category" is a pure display concern, not data worth storing in Mongo.
export const categoryIcons = {
  "ai-machine-learning": Bot,
  nlp: Languages,
  mlops: Workflow,
  "web-development": Globe,
  "frontend-frameworks": Layers,
  "backend-development": Server,
  "mobile-development": Smartphone,
  "blockchain-web3": Blocks,
  "game-development": Gamepad2,
  "ar-vr": Glasses,
  "cloud-devops": Cloud,
  "kubernetes-containers": Boxes,
  "data-engineering": Database,
  "data-science": TestTube,
  databases: Database,
  "developer-tooling": Code2,
  cybersecurity: Shield,
  "testing-qa": TestTube2,
  "programming-languages": Cpu,
  "operating-systems": HardDrive,
  networking: Radio,
  "embedded-iot": Cog,
  robotics: RobotIcon,
  "ui-ux-design": Palette,
  ecommerce: ShoppingCart,
  fintech: DollarSign,
  "healthcare-tech": HeartPulse,
  "productivity-tools": CheckSquare,
  "chat-communication": MessageCircle,
  "content-management": FileText,
  "low-code-no-code": Sparkles,
  "documentation-learning": BookOpen,
};

export const defaultCategoryIcon = Code2;