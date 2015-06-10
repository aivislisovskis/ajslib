<div class="selector <?=$this->instanceName;?>List">
    <div class="left">
        <div class="content leftSelector">
            <? foreach ($this->list as $item) {
            if (!isset($prepared_selList[$item->{$this->listId}])) { ?>
                <div class="item selectItems" data-status="available" data-value="<?=$item->{$this->listId};?>"><?=$item->{$this->title};?></div>
                <? } } ?>
        </div>
    </div>
    <div class="right">
        <div class="content rightSelector">
            <?
            foreach ($this->selection as $item) {
                if (isset($prep_list[$item->{$this->remoteId}])) {
                    ?>
                    <div class="item selectItems" data-status="selected" data-value="<?=$item->{$this->remoteId};?>"><?=$prep_list[$item->{$this->remoteId}]->{$this->title};?></div>
                    <?  } } ?>
        </div>
    </div>
</div>
<script>
    var selectItems;
    $(function () {
        selectItems<?=$this->instanceName;?> = new Selector({'instanceName':'<?=$this->instanceName;?>'});
    });
</script>