import React, { useState, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'Telugu' },
  { code: 'hi', label: 'Hindi' },
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  console.log('Current selectedLanguage:', selectedLanguage);
  console.log('Available languages:', languages);

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    console.log('Changing language to:', lng);
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng).then(() => {
      console.log('Language changed successfully to:', lng);
      localStorage.setItem('language', lng);
    }).catch((error) => {
      console.error('Error changing language:', error);
    });
  };

  return (
    <Select.Root key={selectedLanguage} value={selectedLanguage} onValueChange={changeLanguage}>
      <Select.Trigger className="inline-flex items-center justify-center rounded-md bg-muted px-3 py-1 text-sm font-medium text-foreground shadow-sm hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <Select.Value aria-label={selectedLanguage}>
          {languages.find((lang) => lang.code === selectedLanguage)?.label || 'Language'}
        </Select.Value>
        <Select.Icon>
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md z-50">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-muted cursor-default">
            <ChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {languages.map(({ code, label }) => (
              <Select.Item
                key={code}
                value={code}
                className="relative flex cursor-default select-none items-center rounded-sm py-1 pl-8 pr-2 text-sm font-medium text-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
                  <Check className="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-muted cursor-default">
            <ChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default LanguageSelector;
