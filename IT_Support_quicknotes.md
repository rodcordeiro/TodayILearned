---
created: 2020-04-27T13:00:00-03:00
title: IT tricks and notes
modified: 2020-04-28T15:24:30-03:00
---

# IT Support tips & quicknotes

 Hey guys! Here I'm gonna tell you about some tips and tricks I've learned as IT Analyst working on a Helpdesk company.

 1. Problemns with Remote Desktop
    1. The remote session was disconnected because there are no remote desktop client access licenses for this computer

## Problemns with Remote Desktop (MSTSC)

#### The remote session was disconnected because there are no remote desktop client access licenses for this computer.

 Sometimes, the windows just stop recognizing your access trough mstsc, returning the error that "The remote session was disconnected because there are no remote desktop client access licenses for this computer", I didn't found a good explanation about it yet, but it returns an error, saying to call the network administrator.
 
 

 To solve this, it's pretty simple:

 1. You will run Regedit
 1. Go to HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\
 1. Delete the MSLicensing key and close regedit
 1. Run the MSTSC as administrator and 'et voilá'!