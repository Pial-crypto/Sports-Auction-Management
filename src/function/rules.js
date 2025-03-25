import { createRule } from "./createNewRule";
import updateRule from "./updateRules";

export const handleAddRule = (setError,setNewRule,setEditingRule,setOpenDialog,rules,tournament) => {
    if (rules.length >= 15) {
      setError('Maximum 15 rules allowed');
      return;
    }
 console.log(tournament,"tournament hanling")
    setNewRule({ title: '', description: '', category: '' });
    setEditingRule(null);
    setOpenDialog(true);
   
  };

  export const handleEditRule = (rule,setNewRule,setEditingRule,setOpenDialog) => {
    setNewRule({ ...rule });
    setEditingRule(rule);
    setOpenDialog(true);
  };

 export const handleDeleteRule = (ruleId,setRules,rules) => {
  updateRule({id:ruleId,isDelete:true})
    setRules(rules.filter(rule => rule.id !== ruleId));
    
  };

 export const handleSaveRule = (setError,setNewRule,setEditingRule,setOpenDialog,rules,newRule,editingRule,setRules,tournament) => {
    if (!newRule.title || !newRule.description || !newRule.category) {
      setError('Please fill all fields');
      return;
    }

    if (editingRule) {
      console.log(newRule,"editing rule from handle save rule")
   updateRule({id:newRule.id,title:newRule.title,description:newRule.description,category:newRule.category})
      setRules(rules.map(rule => 
        rule.id === editingRule.id ? { ...newRule, id: rule.id } : rule
     
     
      ));
    } else {
        console.log(newRule,"new rule from handle save rule")
         createRule({...newRule,tournamentId:tournament.id})

       // console.log(rule,"rule from handle save rule")
      setRules([...rules, { ...newRule, id: Date.now() }]);
    }
    
    setOpenDialog(false);
    setError('');
  };

 export const handleTemplateSelect = (template, newRule, setNewRule) => {
    setNewRule({ ...newRule, description: template });
  };