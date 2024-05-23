from django.db import models
from django.conf import settings

# Create your models here.
class DepositProducts(models.Model):
    fin_prdt_cd = models.TextField(unique=True)
    kor_co_nm = models.TextField()
    fin_prdt_nm = models.TextField()
    etc_note = models.TextField()
    join_deny = models.IntegerField()
    join_member = models.TextField()
    join_way = models.TextField()
    spcl_cnd = models.TextField()


class DepositOptions(models.Model):
    deposit_product = models.ForeignKey(DepositProducts,on_delete = models.CASCADE,related_name='deposit_option')
    fin_prdt_cd = models.TextField()
    intr_rate_type_nm = models.CharField(max_length=100)
    intr_rate = models.FloatField(null=True)
    intr_rate2 = models.FloatField(null=True)
    save_trm = models.IntegerField()
    join_users = models.ManyToManyField(settings.AUTH_USER_MODEL, null= True, related_name= 'join_deposit')


class SavingProducts(models.Model):
    fin_prdt_cd = models.TextField(unique=True)
    kor_co_nm = models.TextField()
    fin_prdt_nm = models.TextField()
    etc_note = models.TextField()
    join_deny = models.IntegerField()
    join_member = models.TextField()
    join_way = models.TextField()
    spcl_cnd = models.TextField()
    

class SavingOptions(models.Model):
    saving_product = models.ForeignKey(SavingProducts,on_delete = models.CASCADE,related_name='saving_option')
    fin_prdt_cd = models.TextField()
    intr_rate_type_nm = models.CharField(max_length=100)
    intr_rate = models.FloatField(null=True)
    intr_rate2 = models.FloatField(null=True)
    save_trm = models.IntegerField()
    rsrv_type = models.TextField()
    join_users = models.ManyToManyField(settings.AUTH_USER_MODEL, null= True, related_name= 'join_saving')