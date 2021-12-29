set 101 
set 102 
ifeq 101 102 goto out
func sort 101 102
diff 102 101 102
if!eq 101 102 goto sort
func out 101
exit